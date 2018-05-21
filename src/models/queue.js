import mongoose from 'mongoose'
import Queue from '../schemas/queue'

export default mongoose.model("queue", Queue)