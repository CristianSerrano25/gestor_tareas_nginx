import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Alert from './components/Alert';
import Loading from './components/Loading';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setAlert({ message: '', type: '' });
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      showAlert('Error al cargar las tareas. Por favor, intenta nuevamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      setActionLoading(true);
      const newTask = await createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      showAlert('Tarea creada exitosamente', 'success');
    } catch (error) {
      console.error('Error al crear tarea:', error);
      showAlert('Error al crear la tarea. Por favor, intenta nuevamente.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      setActionLoading(true);
      const updatedTask = await updateTask(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      showAlert('Tarea actualizada exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      showAlert('Error al actualizar la tarea. Por favor, intenta nuevamente.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      showAlert('Tarea eliminada exitosamente', 'success');
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      showAlert('Error al eliminar la tarea. Por favor, intenta nuevamente.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 4000);
  };

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      
      <Alert message={alert.message} type={alert.type} />
      
      <TaskForm onSubmit={handleCreate} loading={actionLoading} />
      
      {loading ? (
        <Loading />
      ) : (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={actionLoading}
        />
      )}
    </div>
  );
}

export default App;
