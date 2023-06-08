const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventType: String,
    pagePath: String,
    timestamp: Date,
    userId: String
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
