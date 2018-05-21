import mongoose from 'mongoose'
import App from './src/app'
import env from './src/env'
import cron from 'node-cron'

// Initiate the mongoose connection
mongoose.connect(env.constring)

cron.schedule('*/6 * * * * *', () => {
    console.log('hello')
    App
        .syncMatch()
        .then(r => console.log(r))
        .catch(e => console.log(e))
})

cron.schedule('*/30 * * * * *', () => {
    console.log('hello')
    App
        .syncPlayer()
        .then(r => console.log(r))
        .catch(e => console.log(e))
})