import express from 'express';
import {createEvent, upload, eventList, deleteEvent, updateEvent} from '../controllers/eventController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/event', upload.single('image'), createEvent);
router.get('/listEvent',authenticateToken, eventList);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateEvent/:id', upload.single('image'), updateEvent);

export default router;