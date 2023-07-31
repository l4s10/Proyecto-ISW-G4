'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import { colors } from "@/utils/colors";
import useAuth from "@/hooks/useAuth";

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

const AsistenciaForm = () => {
  const [formData, setFormData] = useState({
    brigadista: '',
    date: new Date(),
    markType: '',
  });

  const [users, setUsers] = useState([]);
  const { token, user } = useAuth();
  const isAdmin = user && user.roles && user.roles.includes('64b9468015f4e5e680586755');

  useEffect(() => {
    if (!token && typeof window !== 'undefined') {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      window.location.href = '/signin';
    } else if (typeof window !== 'undefined' && (!token || !isAdmin)) {
      // Si el usuario no es un administrador, redirigirlo a la página de asistencias
      window.location.href = '/asistencias';
    }
  }, [token, isAdmin]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        if (res.data && res.data.state === "Success" && Array.isArray(res.data.data.users)) {
          setUsers(res.data.data.users);
          if (res.data.data.users.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              brigadista: res.data.data.users[0]._id,
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
      date: date[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/asistencias', formData);
      alert('Asistencia registrada exitosamente.');
    } catch (error) {
      alert('Error al registrar la asistencia.');
      console.error(error);
    }
  };

  // Si el usuario no es un administrador, no renderizamos el formulario
  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>No tienes permiso para acceder a esta página.</Typography>
      </div>
    );
  }

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
          Registro de Asistencia
        </Typography>
        <FormControl fullWidth>
        <br />
          <InputLabel id="brigadista-label" style={{ color: colors.white }}>Brigadista</InputLabel>
          <Select style={{ color: colors.white }}
            labelId="brigadista-label"
            name="brigadista"
            value={formData.brigadista}
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
          value={formData.date}
          onChange={handleDateChange}
        />
        <FormControl fullWidth>
        <br />
          <InputLabel id="mark-type-label" style={{ color: colors.white }}>Tipo de Marca</InputLabel>
          <Select
            labelId="mark-type-label"
            name="markType"
            value={formData.markType}
            onChange={handleChange}
            fullWidth
            style={{ color: colors.white }}
          >
            <MenuItem value={"ENTRADA"}>ENTRADA</MenuItem>
            <MenuItem value={"SALIDA"}>SALIDA</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <Button variant="contained" style={{ backgroundColor: colors.green, color: colors.primaryBlack }} type="submit">
        Ingresar
        </Button>
        <br />
        <Button variant="contained" style={{ backgroundColor: colors.orange, color: colors.primaryBlack }}>
          <Link href="/asistencias">Volver</Link>
        </Button>
      </FormContainer>
    </Box>
  );
};

export default AsistenciaForm;
