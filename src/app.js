import mongoose from 'mongoose'
import {Player as PubgPlayer, Match as PubgMatch, Season} from 'pubg-sdk-alpha'
import env from './env'
import Player from './models/player'
import MatchService from './services/match'
import PlayerService from './services/player'
import Match from './models/match'
import player from './models/player'
import Queue from './models/queue'
import { isNullOrUndefined } from 'util';

export default class App {
    static async syncPlayer() {
        const nextPlayer = await Player
            .find()
            .sort('updatedAt')
            .limit(1)

        console.log(`Pulling latest data for ${nextPlayer[0].name}`)

        const pubgPlayerData = await new PubgPlayer(nextPlayer[0].id)
        const playerData     = new PlayerService(pubgPlayerData.data, nextPlayer[0])
        const newMatches     = playerData.filterMatches()

        if(newMatches && newMatches.length > 0) {
            console.log(`${newMatches.length} new matches found`)
            const missingMatches = await MatchService.findMissing(newMatches)

            await MatchService.queueAll(missingMatches)    
        }
        
        await nextPlayer[0].update(playerData.format())

        return;
    }

    static async syncMatch() {
        const nextMatch = await Queue.findOne({active: false})

        try {
            if(nextMatch !== null) {
                console.log(`Syncing ${nextMatch.id}`)
                await nextMatch.update({active: true})

                const players      = await Player.find()
                const match        = await new PubgMatch(nextMatch.id)
                const matchService = new MatchService(match)
    
                await matchService.syncMatch(players.map(p => p.id))
                await Queue.deleteOne({id: nextMatch.id})

                return `${nextMatch.id} succesfully synced`
            }
        } catch(e) {
            return `${nextMatch.id} failed to sync with error: ${e}`
        }

        return 'No matches found to sync'
    }

    static async aggregateData() {

    }
}