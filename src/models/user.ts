import pool from '../config/database';

export interface User {
  user_id?: number;
  username: string;
  email: string;
  password: boolean;
  role_id?: number;
}

export class UserModel {
    static async findAll(): Promise<User[]> {
      const [rows] = await pool.query('SELECT * FROM user');
      return rows as User[];
    }

    static async findById(user_id: number): Promise<User | null> {
        const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [user_id]);
        return (rows as User[])[0] || null;
    }

    static async create(User: User): Promise<User> {
        const [result] = await pool.query(
          'INSERT INTO user (title, description, completed) VALUES (?, ?, ?, ?)',
          [User.username, User.email, User.password, User.role_id]
        );
        
        // Handle potential null with type assertion
        const createdUser = await this.findById((result as any).insertId);
        if (!createdUser) {
          throw new Error('Failed to create task');
        }
        
        return createdUser;
    }

    static async update(user_id: number, task: User): Promise<User> {
        await pool.query(
          'UPDATE user SET username = ?, password = ?, email = ? WHERE user_id = ?',
          [task.username, task.password, task.email, user_id]
        );
        
        const updatedTask = await this.findById(user_id);
        if (!updatedTask) {
          throw new Error('Task not found after update');
        }
        
        return updatedTask;
    }

    static async delete(user_id: number): Promise<void> {
        await pool.query('DELETE FROM user WHERE user_id = ?', [user_id]);
    }
}