import express from 'express';
import {testRoute, sendTaskEmail, updateEmail, sendEmailEvent, 
eventUpdateEmail, eventCancelled, welcomeEmail} from '../controllers/emailController.js';

const router = express.Router();

router.get('/', testRoute);
router.post('/send-email', sendTaskEmail);
router.post('/update-email', updateEmail);
router.post('/event-email', sendEmailEvent);
router.post('/email-update', eventUpdateEmail);
router.post('/email-cancel', eventCancelled);
router.post('/welcome-email', welcomeEmail);


export default router;