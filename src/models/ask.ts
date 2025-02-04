import pool from '../config/database';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  created_at?: Date;
}

export class TaskModel {
  static async findAll(): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows as Task[];
  }

  static async findById(id: number): Promise<Task | null> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return (rows as Task[])[0] || null;
  }

  static async create(task: Task): Promise<Task> {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [task.title, task.description, task.completed]
    );
    
    // Handle potential null with type assertion
    const createdTask = await this.findById((result as any).insertId);
    if (!createdTask) {
      throw new Error('Failed to create task');
    }
    
    return createdTask;
  }

  static async update(id: number, task: Task): Promise<Task> {
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [task.title, task.description, task.completed, id]
    );
    
    const updatedTask = await this.findById(id);
    if (!updatedTask) {
      throw new Error('Task not found after update');
    }
    
    return updatedTask;
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
}