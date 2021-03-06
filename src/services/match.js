import Match from '../models/match'
import Queue from '../models/queue'
import MatchRecord from '../models/matchRecord'
import {Match as PubgMatch} from 'apubg-sdk'
import fs from 'fs'

export default class MatchService {
    constructor(data, record) {
        this.data   = data
        this.record = record
    }

    format() {
        const players = this.data.included.filter(d => d.type === "participant")
        const rosters = this.data.included.filter(d => d.type === "roster")

        return {
            ...this.data.data,
            ...this.data.data.attributes,
            rosters,
            players:   players.map(p => p.attributes.stats),
            link:      this.data.data.links.self,
            createdAt: Date.now(),
            assets:    this.data.data.relationships.assets
        }
    }

    generateMatchRecords(data) {
        data.players.forEach(player => {
            console.log(`Creating match record for ${player.name}`)

            MatchRecord.create({
                ...player,
                map: data.mapName,
                mode: data.gameMode.split('-').shift(),
                perspective: data.gameMode.indexOf('fpp') >= 0 ? 'fpp' : 'tpp'
            })            
        })
    }

    async syncMatch() {
        const existingRecord = await Match.findOne({id: this.data.id})

        if(existingRecord !== null) {
            return existingRecord
        }

        const data = this.format()

        this.generateMatchRecords(data)

        return await Match.create(data)
    }

    static async queueAll(ids) {
        return await Promise.all(ids.map(id => MatchService.queueNext(id)))
    }

    static async queueNext(id) {
        const existing = await Queue.findOne({id})

        if(existing === null) {
            return await Queue.create({
                id
            }) 
        }

        return;
    }

    static async findMissing(matches) {
        const promises = matches.map(async match => {
            const found = await Match
                .where({id: match.id})
                .findOne()

            return found === null ? match.id : false
        })

        const results = await Promise.all(promises)

        return results.filter(r => r)
    }

    static async saveTelemetry(id) {
        const match = await PubgMatch.get(id)
        const telemetry = await match.getTelemetry(true)

        return fs.writeFileSync(`data/${id}.json`, JSON.stringify(telemetry))
    }
}