import React, { useState } from 'react';

const TaskForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      return;
    }
    onSubmit(formData);
    setFormData({
      titulo: '',
      descripcion: '',
      estado: 'pendiente'
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título de la tarea"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción (opcional)"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
