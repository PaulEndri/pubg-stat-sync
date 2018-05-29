import {Schema} from 'mongoose'
import LocationTelemetry from './telemetryWeaponLocation'

const WeaponTelemetry = new Schema({
    usage:    Number,
    kills:    Number,
    damage:   Number,
    hit:      Number,
    distance: Number,
    name:     String,
    location: LocationTelemetry
}, {_id: false})

export default WeaponTelemetry