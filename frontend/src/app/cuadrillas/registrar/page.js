'use client';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import api from '@/api/rootAPI';
import Link from 'next/link';


const CuadrillaForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    squadLeader: '',
    brigadistas: [],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        if (res.data && res.data.state === "Success" && Array.isArray(res.data.data.users)) {
          setUsers(res.data.data.users);
          if (res.data.data.users.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              squadLeader: res.data.data.users[0]._id,
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleBrigadistaChange = (index) => (event) => {
    const newBrigadistas = [...formData.brigadistas];
    newBrigadistas[index] = event.target.value;
    setFormData({
      ...formData,
      brigadistas: newBrigadistas,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/squad', formData);
      alert('Cuadrilla registrada exitosamente.');
    } catch (error) {
      alert('Error al registrar la cuadrilla.');
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h1">Registrar Cuadrilla</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Líder de la Cuadrilla"
          name="squadLeader"
          value={formData.squadLeader}
          onChange={handleChange}
          fullWidth
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        {[...Array(formData.brigadistas.length + 1)].map((_, index) =>
          index < 4 ? (
            <TextField
              select
              label={`Brigadista ${index + 1}`}
              name={`brigadista-${index}`}
              value={formData.brigadistas[index] || ''}
              onChange={handleBrigadistaChange(index)}
              fullWidth
            >
              {users
                .map((user) => (
                  <MenuItem key={user._id} value={user._id} disabled={formData.brigadistas.includes(user._id)}>
                    {user.name}
                  </MenuItem>
                ))}
            </TextField>
          ) : null
        )}
        <Button variant="contained" color="primary" type="submit">
          Registrar Cuadrilla
        </Button>
        <Button variant="contained" color="secondary">
          <Link href='cuadrillas'>Volver</Link>
        </Button>
      </form>
    </div>
  );
};

export default CuadrillaForm;
