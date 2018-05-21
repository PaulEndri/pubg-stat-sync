import mongoose from 'mongoose'
import Match from '../schemas/match'

export default mongoose.model("pubg_match", Match)