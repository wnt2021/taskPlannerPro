import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String, required: false},
    date: { type: String, required: false },
    location: {type: String, required: true},
    state: {type: String},
    image: {type: String}
});

const Event = mongoose.model('Event', eventSchema);

export default Event;