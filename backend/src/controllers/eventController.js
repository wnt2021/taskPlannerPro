import Event from "../models/event.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage, limits: {fileSize: 5 * 1024 * 1024} });

const createEvent = async(req, res) => {
    const {name, description, date, location} = req.body;
    const image = req.file ? req.file.filename : null;

    const state = "pending";

    try {
        const newEvent = new Event({name, description, date, location, state, image});
        await newEvent.save();

        res.status(201).json({success: "Event created succesfully", event: newEvent});
    } catch (error) {
        res.status(500).json({error: "Event Error", details: error});
    }
}

const eventList = async(req, res) => {
    try {
        const events = await Event.find();
        
        res.status(201).json(events);
    } catch (error) {
        res.status(404).json({error: "Task Error", details: error});
    }
}

const deleteEvent = async(req, res) => {
    const id = req.params.id;

    try {
        const events = await Event.findByIdAndDelete(id);        

        res.status(201).json(events);
    } catch (error) {
        res.status(404).json({error: "Event Error", details: error});
    }
}

const updateEvent = async(req, res) => {
    const {id} = req.params;
    const {name, description, date, location, existingImage} = req.body;
    const image = req.file ? req.file.filename : existingImage;
    try {
        const updateEvent = await Event.findByIdAndUpdate({_id: id}, {name, description, date, location, image}, {new: true});
        res.status(200).json({succes: true, event: updateEvent});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export {createEvent, eventList, deleteEvent, updateEvent};