import {Schema} from 'mongoose'

const Data = new Schema({
    type: String,
    id: String
}, {_id: false, id: false})

export default Data