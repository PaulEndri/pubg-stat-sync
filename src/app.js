import mongoose from 'mongoose'
import {Player as PubgPlayer, Match as PubgMatch, Season, TelemetryParser as PubgTelemetryParser} from 'apubg-sdk'
import env from './env'
import Player from './models/player'
import MatchService from './services/match'
import PlayerService from './services/player'
import Match from './models/match'
import player from './models/player'
import Queue from './models/queue'
import { isNullOrUndefined } from 'util';
import TelemetryService from './services/telemetry';

const ACTIVE_SEASON = 'division.bro.official.2018-05'

export default class App {
    static async syncPlayer() {
        const nextPlayer = await Player
            .find()
            .sort('updatedAt')
            .limit(1)

        const pubgPlayerData = await new PubgPlayer(nextPlayer[0].id)
        const playerData     = new PlayerService(pubgPlayerData, nextPlayer[0])
        
        await playerData.backfillSeason(ACTIVE_SEASON)

        let newMatches = playerData.filterMatches()

        //console.log(newMatches)

        //newMatches = playerData.data.relationships.matches.data

        if(newMatches && newMatches.length > 0) {
            console.log(`${newMatches.length} new matches found`)
            const missingMatches = await MatchService.findMissing(newMatches)

            await MatchService.queueAll(missingMatches)    
        }
        
        await nextPlayer[0].update(playerData.format())

        return `Synced ${nextPlayer[0].name}`
    }

    static async syncMatch() {
        const nextMatch = await Queue.findOne({active: false})

        try {
            if(nextMatch !== null) {
                console.log(`Syncing ${nextMatch.id}`)
                await nextMatch.update({active: true})

                const match         = await new PubgMatch(nextMatch.id)
                const matchService  = new MatchService(match)
                const telemetryService = new TelemetryService()

                
                await telemetryService.syncMatch(match,
                    await matchService.syncMatch()
                )
                await Queue.deleteOne({id: nextMatch.id})

                return `${nextMatch.id} succesfully synced`
            }
        } catch(e) {
            throw e
            return `${nextMatch.id} failed to sync with error: ${e}`
        }

        return 'No matches found to sync'
    }

    static async getTelemetry() {
        console.log('fetching')
        const matches = await Match.aggregate([
            {$project: {_id: "$id"}}
        ])
        console.log(matches)
        return this.nextTelemetry(matches.pop(), matches)
    }

    static nextTelemetry({_id}, matches) {
        console.log(`Pulling telemetry for ${_id}`)

        MatchService
            .saveTelemetry(_id)
            .then(() => {
                console.log(`Saved telemetry for ${_id}`)
                if(matches.length > 0) {
                    setTimeout(() => this.nextTelemetry(matches.pop(), matches), 20000)
                }
            })
    }
}