const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { eventType, pagePath, timestamp, userId } = req.body;

    try {
        const event = new Event({ eventType, pagePath, timestamp, userId });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
