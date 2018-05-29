import {Schema} from 'mongoose'

const LocationTelemetry = new Schema({
    ArmShot:    Number,
    HeadShot:   Number,
    TorsoShot:  Number,
    PelvisShot: Number,
    LegShot:    Number
}, {_id: false})

export default LocationTelemetry