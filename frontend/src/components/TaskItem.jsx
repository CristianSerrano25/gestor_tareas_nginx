import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    titulo: task.titulo,
    descripcion: task.descripcion || '',
    estado: task.estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      titulo: task.titulo,
      descripcion: task.descripcion || '',
      estado: task.estado
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${isEditing ? 'editing' : ''}`}>
      {!isEditing ? (
        <>
          <div className="task-header">
            <div>
              <h3 className="task-title">{task.titulo}</h3>
              <span className={`task-status ${task.estado}`}>
                {task.estado}
              </span>
            </div>
          </div>
          {task.descripcion && (
            <p className="task-description">{task.descripcion}</p>
          )}
          <div className="task-actions">
            <button
              onClick={handleEdit}
              className="btn btn-secondary"
              disabled={loading}
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={loading}
            >
              Eliminar
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="task-edit-form">
          <div className="form-group">
            <label htmlFor={`titulo-${task.id}`}>Título</label>
            <input
              type="text"
              id={`titulo-${task.id}`}
              name="titulo"
              value={editData.titulo}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`descripcion-${task.id}`}>Descripción</label>
            <input
              type="text"
              id={`descripcion-${task.id}`}
              name="descripcion"
              value={editData.descripcion}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`estado-${task.id}`}>Estado</label>
            <select
              id={`estado-${task.id}`}
              name="estado"
              value={editData.estado}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskItem;
