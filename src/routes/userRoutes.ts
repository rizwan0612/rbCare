import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 */
router.get('/', UserController.getUsers);
router.get('/:user_id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:user_id', UserController.updateUser);
router.delete('/:user_id', UserController.deleteUser);

export default router;