'use client';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import api from '@/api/rootAPI';
import Link from 'next/link';
import Box from '@mui/system/Box';
import styled from 'styled-components';
import { colors } from '../../../utils/colors';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #313236;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

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
        if (res.data && res.data.state === 'Success' && Array.isArray(res.data.data.users)) {
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.primaryBlack} /* Cambia el color de fondo del contenedor principal al color primario de modo oscuro */
    >
      <FormContainer component="form" onSubmit={handleSubmit} maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom style={{ color: colors.white }}>
          Registrar Cuadrilla
        </Typography>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: colors.white }, // Cambia el color del label del input
          }}
          InputProps={{
            style: { color: colors.white }, // Cambia el color del texto del input
          }}
        />
        <br></br>
        <TextField
          select
          label="Líder de la Cuadrilla"
          name="squadLeader"
          value={formData.squadLeader}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            style: { color: colors.white }, // Cambia el color del label del input
          }}
          InputProps={{
            style: { color: colors.white }, // Cambia el color del texto del input
          }}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        {[...Array(formData.brigadistas.length + 1)].map((_, index) =>
          index < 4 ? (
            <TextField
              key={index}
              select
              label={`Brigadista ${index + 1}`}
              name={`brigadista-${index}`}
              value={formData.brigadistas[index] || ''}
              onChange={handleBrigadistaChange(index)}
              fullWidth
              InputLabelProps={{
                style: { color: colors.white }, // Cambia el color del label del input
              }}
              InputProps={{
                style: { color: colors.white }, // Cambia el color del texto del input
              }}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id} disabled={formData.brigadistas.includes(user._id)}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          ) : null
        )}
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem', backgroundColor: colors.green, color: colors.primaryBlack }}>
        Ingresar
        </Button>
        <Button variant="contained" color="secondary" style={{ marginTop: '1rem', backgroundColor: colors.orange, color: colors.primaryBlack }}>
          <Link href="/cuadrillas">Volver</Link>
        </Button>
      </FormContainer>
    </Box>
  );
};
export default CuadrillaForm;

