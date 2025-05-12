import express from 'express';
import {createUser, loginUser, logout, savePoints, registerUser, 
listPoint, updateExperience, saveEventPoints, getAllUsers} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logout);
router.put('/points/:id', savePoints);
router.put('/eventPoints/:id', saveEventPoints);
router.post('/register', registerUser);
router.post('/user/:id', createUser);
router.get('/listPoint/:id', listPoint);
router.post('/experience/:id', updateExperience);
router.get('/users', getAllUsers);

export default router;