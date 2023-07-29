'use client';

import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RemunerationCalculator() {
  const [formData, setFormData] = useState({
    user: '',
    hoursWorked: 0,
    salary: 0,
  });
  
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'hoursWorked') {
      const hoursWorked = Number(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        hoursWorked,
        salary: hoursWorked * 2500,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/remuneraciones', formData);
      if (response.status === 201) {
        alert('Remuneración registrada exitosamente.');
      } else {
        throw new Error(`Unexpected response code ${response.status}`);
      }
    } catch (error) {
      alert('Error al registrar la remuneración.');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        if (res.data && res.data.state === "Success" && Array.isArray(res.data.data.users)) {
          setUsers(res.data.data.users);
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
      <Typography variant="h1">Registrar Remuneración</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Usuario"
          name="user"
          value={formData.user}
          onChange={handleChange}
          fullWidth
        >
          {users.map(user => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          label="Horas trabajadas"
          name="hoursWorked"
          value={formData.hoursWorked}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit">
          Registrar Remuneración
        </Button>
      </form>
    </div>
  );
}

export default RemunerationCalculator;
