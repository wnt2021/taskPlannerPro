import express from 'express';
import {createTask, listTask, deleteTask, updateTask} from '../controllers/taskController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/list', authenticateToken, listTask);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', updateTask);

export default router;