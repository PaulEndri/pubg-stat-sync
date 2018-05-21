import {Schema} from 'mongoose'
import rosterStats from './rosterStats';

const RosterAttributes = new Schema({
    won:     String,
    shardId: String,
    stats:   rosterStats
}, {_id: false, id: false})

export default RosterAttributes