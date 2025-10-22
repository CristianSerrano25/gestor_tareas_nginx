import { Request, Response } from 'express';
import TaskService from '../services/TaskService';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/Task';

class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const task = await this.taskService.getTaskById(id);
      
      if (!task) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }

      res.json(task);
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      res.status(500).json({ error: 'Error al obtener la tarea' });
    }
  };

  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateTaskDTO = req.body;
      const task = await this.taskService.createTask(data);
      res.status(201).json(task);
    } catch (error: any) {
      console.error('Error al crear tarea:', error);
      if (error.message === 'El título es requerido') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear la tarea' });
      }
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const data: UpdateTaskDTO = req.body;
      const task = await this.taskService.updateTask(id, data);
      
      if (!task) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }

      res.json(task);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const deleted = await this.taskService.deleteTask(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  };
}

export default TaskController;
