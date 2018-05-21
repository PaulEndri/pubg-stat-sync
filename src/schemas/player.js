import {Schema} from 'mongoose';

const Player = new Schema({
    id:        String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    name:      String,
    link:      String,
    matches:   [String]
})

export default Player