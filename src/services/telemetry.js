import Match from '../models/match'
import Queue from '../models/queue'
import MatchRecord from '../models/matchRecord'
import Telemetry from '../models/telemetry'
import {TelemetryParser} from 'apubg-sdk'
import fs from 'fs'

export default class TelemetryService {
    async syncMatch(match, dbMatch) {
        const telemetry = await match.getTelemetry(true)

        fs.writeFile(`data/${match.id}.json`, JSON.stringify(telemetry), e => {
            if (e) console.log(e)
        })

        const parser    = new TelemetryParser(telemetry);
        const parsed    = await parser.parse();
        const promises  = []

        const extraValues = {
            perspective: dbMatch.gameMode.indexOf('fpp') >= 0 ? 'fpp': 'tpp',
            mode:        dbMatch.gameMode.split('-').shift(),
            map:         dbMatch.mapName.split('_').shift()
        }

        Object.values(parsed.players).forEach((player) => {
            const syncedPlayers = {
                ...player,
                ...extraValues,
                weapons : Object.values(player.weapons)
            }

            promises.push(Telemetry.create(syncedPlayers))
        })

        return await Promise.all(promises)
    }
}