import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;