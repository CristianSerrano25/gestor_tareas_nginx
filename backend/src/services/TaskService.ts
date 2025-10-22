import { Pool } from 'pg';
import Database from '../database/Database';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/Task';

class TaskService {
  private pool: Pool;

  constructor() {
    this.pool = Database.getInstance().getPool();
  }

  async getAllTasks(): Promise<Task[]> {
    const result = await this.pool.query<Task>(
      'SELECT * FROM tasks ORDER BY id DESC'
    );
    return result.rows;
  }

  async getTaskById(id: number): Promise<Task | null> {
    const result = await this.pool.query<Task>(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    const { titulo, descripcion = '', estado = 'pendiente' } = data;
    
    if (!titulo || titulo.trim() === '') {
      throw new Error('El título es requerido');
    }

    const result = await this.pool.query<Task>(
      'INSERT INTO tasks (titulo, descripcion, estado) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descripcion, estado]
    );
    
    return result.rows[0];
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<Task | null> {
    const { titulo, descripcion, estado } = data;
    
    const result = await this.pool.query<Task>(
      `UPDATE tasks 
       SET titulo = COALESCE($1, titulo), 
           descripcion = COALESCE($2, descripcion), 
           estado = COALESCE($3, estado) 
       WHERE id = $4 
       RETURNING *`,
      [titulo, descripcion, estado, id]
    );

    return result.rows[0] || null;
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.pool.query(
      'DELETE FROM tasks WHERE id = $1',
      [id]
    );
    return (result.rowCount || 0) > 0;
  }
}

export default TaskService;
