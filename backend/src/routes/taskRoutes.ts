import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;
