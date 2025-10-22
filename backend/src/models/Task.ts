export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: 'pendiente' | 'completada';
}

export interface CreateTaskDTO {
  titulo: string;
  descripcion?: string;
  estado?: 'pendiente' | 'completada';
}

export interface UpdateTaskDTO {
  titulo?: string;
  descripcion?: string;
  estado?: 'pendiente' | 'completada';
}
