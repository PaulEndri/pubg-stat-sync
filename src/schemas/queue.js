import {Schema} from 'mongoose'

const Queue = new Schema({
    id:        String,
    active:    {type: Boolean, default: false},
    createdAt: {type: Date,  default: Date.now}
})

export default Queue