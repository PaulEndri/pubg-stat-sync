import mongoose from 'mongoose'
import App from './src/app'
import env from './src/env'
import cron from 'node-cron'

// Initiate the mongoose connection
mongoose.connect(env.constring)

cron.schedule('*/20 * * * * *', () => {
    App
        .syncMatch()
        .then(r => console.log(r))
        .catch(e => console.log(e))
})

cron.schedule('*/15 * * * * *', () => {
    App
        .syncPlayer()
        .then(r => console.log(r))
        .catch(e => console.log(e))
})