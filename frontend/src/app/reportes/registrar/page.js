'use client';


import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import api from '@/api/rootAPI';
import Link from 'next/link';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
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

const StyledFlatpickr = styled(Flatpickr)`
  width: 100%;
  margin: 1rem 0;
  padding: 0.7rem;
  border: 1px solid #0000001f;
  border-radius: 0.3rem;
`;

const ReporteForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    usuario: '',
    fecha: new Date(),
    descripcion: '',
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date[0],
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
          Registrar Reporte
        </Typography>
        <TextField
          label="Título"
          name="titulo"
          value={formData.titulo}
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
        <FormControl fullWidth margin="normal">
          <InputLabel style={{ color: colors.white }} id="usuario-label">Usuario</InputLabel>
          <Select style={{ color: colors.white }}
            labelId="usuario-label"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            fullWidth
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}  {/* Asegúrate de cambiar "name" al campo correspondiente en tu objeto de usuario */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledFlatpickr
          data-enable-time
          options={{
            dateFormat: 'd-m-Y H:i',
            locale: Spanish,
          }}
          value={formData.fecha}
          onChange={handleDateChange}
        />
        <TextField 
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: colors.white }, // Cambia el color del label del input
          }}
          InputProps={{
            style: { color: colors.white }, // Cambia el color del texto del input
          }}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem', backgroundColor: colors.green, color: colors.primaryBlack }}>
        Ingresar
        </Button>
        <Button variant="contained" color="secondary" style={{ marginTop: '1rem', backgroundColor: colors.orange, color: colors.primaryBlack }}>
          <Link href="/reportes">Volver</Link>
        </Button>
      </FormContainer>
    </Box>
  );
};

export default ReporteForm;
