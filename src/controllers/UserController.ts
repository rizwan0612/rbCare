import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
export class UserController {

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: completed
   *         schema:
   *           type: boolean
   *         description: Filter User by completion status
   *     responses:
   *       200:
   *         description: List of all Users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(parseInt(req.params.user_id));
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid input
   */

  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'username and password are required' });
      }
      
      const newUser = await UserModel.create({ 
        username, 
        password, 
        email 
      });
      
      res.status(201).json(newUser);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create user';
      res.status(500).json({ message });
    }
  }
  
  static async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserModel.update(
        parseInt(req.params.user_id),
        req.body
      );
      
      res.json(updatedUser);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update user';
      res.status(404).json({ message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(parseInt(req.params.user_id));
      if (!user) return res.status(404).json({ message: 'Task not found' });
      
      await UserModel.delete(parseInt(req.params.user_id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}