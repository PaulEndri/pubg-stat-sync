import {Schema} from 'mongoose';
import relationship from './relationship';
import matchPlayerStats from './matchPlayerStats';
import roster from './roster';
import DataSet from './dataSet';

const Match = new Schema({
    id:        String,
    createdAt: {type: Date, default: Date.now},
    gameMode:  String,
    tags:      String,
    mapName:   String,
    duration:  Number,
    stats:     String,
    titleId:   String,
    shardId:   String,
    players:   [matchPlayerStats],
    assets:    DataSet,
    rosters:   [roster],
    link:      String
})

export default Match