import {Schema} from 'mongoose'
import WeaponTelemetry from './telemetryWeaponRecord'

const Telemetry = new Schema({
    name:            String,
    accountId:       String,
    name:            String,
    mode:            String,
    perspective:     String,
    map:             String,
    teamId:          Number,
    kills:           Number,
    shamefurDisplay: Boolean,
    weapons:         [WeaponTelemetry]
})

export default Telemetry