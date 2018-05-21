import {Schema} from 'mongoose';
import relationship from './relationship';
import rosterAttribute from './rosterAttribute';

const Roster = new Schema({
    type: {
        type:    'string',
        default: 'roster'
    },
    id:            String,
    attributes:    rosterAttribute,
    relationships: relationship,
    links:         String
}, {_id: false, id: false})

export default Roster