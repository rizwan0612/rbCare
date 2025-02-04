import { Request, Response } from 'express';
import { Task, TaskModel } from '../models/ask';

export class TaskController {
  static async getTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.findAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const task = await TaskModel.findById(parseInt(req.params.id));
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { title, description, completed } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }
      
      const newTask = await TaskModel.create({ 
        title, 
        description, 
        completed: completed || false 
      });
      
      res.status(201).json(newTask);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create task';
      res.status(500).json({ message });
    }
  }
  
  static async updateTask(req: Request, res: Response) {
    try {
      const updatedTask = await TaskModel.update(
        parseInt(req.params.id),
        req.body
      );
      
      res.json(updatedTask);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update task';
      res.status(404).json({ message });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const task = await TaskModel.findById(parseInt(req.params.id));
      if (!task) return res.status(404).json({ message: 'Task not found' });
      
      await TaskModel.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}