import {Schema} from 'mongoose'

const Attributes = new Schema({
    "DBNOs":           Number,
    "assists":         Number,
    "boosts":          Number,
    "damageDealt":     Number,
    "deathType":       String,
    "headshotKills":   Number,
    "heals":           Number,
    "killPlace":       Number,
    "killPoints":      Number,
    "killPointsDelta": Number,
    "killStreaks":     Number,
    "kills":           Number,
    "lastKillPoints":  Number,
    "lastWinPoints":   Number,
    "longestKill":     Number,
    "map":             String,
    "mode":            String,
    "mostDamage":      Number,
    "name":            String,
    "playerId":        String,
    "perspective":     String,
    "revives":         Number,
    "rideDistance":    Number,
    "roadKills":       Number,
    "teamKills":       Number,
    "timeSurvived":    Number,
    "vehicleDestroys": Number,
    "walkDistance":    Number,
    "weaponsAcquired": Number,
    "winPlace":        Number,
    "winPoints":       Number,
    "winPointsDelta":  Number
})

export default Attributes;