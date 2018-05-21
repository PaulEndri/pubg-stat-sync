import {Schema} from 'mongoose'
import dataSet from './dataSet';

const Relationships = new Schema({
    assets:       dataSet,
    matches:      dataSet,
    participants: dataSet,
    rosters:      dataSet,
    team:         dataSet
}, {_id: false, id: false})

export default Relationships