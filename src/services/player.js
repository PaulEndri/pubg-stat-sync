export default class Player {
    constructor(data = {}, record = {}) {
        this.record = record
        this.data   = data
    }

    async backfillSeason(season) {
        const {relationships}  = await this.data.loadSeason(season)
        const relationshipData = Object.values(relationships)

        relationshipData.forEach(({data}) => {
            try {
                if (data instanceof Array) {
                    data.forEach(match => {
                        this.data.relationships.matches.data.push(match)
                    })
                }
            } catch(e) {
                console.log(e)
            }
        })

        return
    }

    format() {
        const {relationships, attributes, links, _id} = this.data;
        const matches                                 = relationships.matches.data.map(m => m.id)
        const id                                      = this.record.id ? this.record.id : _id

        return {
            matches,
            id,
            name:      attributes.name,
            links:     links.self,
            updatedAt: Date.now()
        }
    }

    filterMatches() {
        try {
            const results = this
                .data
                .relationships
                .matches
                .data
                .filter(match => this.record.matches.indexOf(match.id) < 0)

            return results || []
        } catch(e) {
            console.log(e)
        }

        return []
    }

    static format(data) {
        return new Player(data).format()
    }
}