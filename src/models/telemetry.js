import mongoose from 'mongoose'
import Telemetry from '../schemas/telemetryRecord'

export default mongoose.model("pubg_telemetry", Telemetry)