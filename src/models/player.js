import mongoose from 'mongoose'
import Player from '../schemas/player'

export default mongoose.model("pubg_player", Player)