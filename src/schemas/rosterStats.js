import {Schema} from 'mongoose'

const RosterStats = new Schema({
    "rank":   Number,
    "teamId": Number
}, {_id: false, id: false})

export default RosterStats