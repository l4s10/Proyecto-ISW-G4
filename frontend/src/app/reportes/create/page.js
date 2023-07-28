'use client';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import api from '@/api/rootAPI';
import Link from 'next/link';

const AsistenciaForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    usuario: '',
    fecha: '',
    descripcion: '',
  });

  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/reportes', formData);
      alert('Reporte registrado exitosamente.');
    } catch (error) {
      alert('Error al registrar el reporte.');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        if (res.data && res.data.state === "Success" && Array.isArray(res.data.data.users)) {
          setUsers(res.data.data.users);
          // Establecemos el usuario predeterminado
          if (res.data.data.users.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              usuario: res.data.data.users[0]._id,
            }));
          }
        } else {
          console.error('Error fetching users: response data does not contain an array of users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h1">Registrar Reporte</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
            select
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            fullWidth
            >
            {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                {user.name}
                </MenuItem>
            ))}
        </TextField>
        <TextField
          label="Fecha"
          name="fecha"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          multiline
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Registrar Reporte
        </Button>
        <Button variant="contained" color="secondary">
          <Link href="/reportes">Volver</Link>
        </Button>
      </form>
    </div>
  );
};

export default AsistenciaForm;
