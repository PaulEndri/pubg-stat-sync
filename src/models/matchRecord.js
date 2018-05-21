import mongoose from 'mongoose'
import MatchRecord from '../schemas/matchPlayerStats'

export default mongoose.model("pubg_match_record", MatchRecord)