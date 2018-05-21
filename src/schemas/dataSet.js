import {Schema} from 'mongoose'
import data from './data';

const DataSet = new Schema({
    data: [data]
}, {_id: false, id: false})

export default DataSet