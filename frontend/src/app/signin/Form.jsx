'use client';

import { useState } from 'react';
import { signin } from './apiSignin';
import { Button, TextField, Card, CardContent, Typography, Grid } from '@mui/material';
import { colors } from "@/utils/colors";

export const Form = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(email);
      console.log(response);

      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
            <CardContent>
              <Typography variant="h5" align="center" style={{ color: colors.white }}>Iniciar Sesión</Typography>
              <Typography variant="body1" align="center" style={{ color: colors.white, marginTop: '10px' }}>
                Por favor, introduce tu dirección de correo electrónico para iniciar sesión.
              </Typography>
              <TextField
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleChangeEmail}
                style={{ marginTop: '10px', backgroundColor: colors.white }}
              />
              <Button 
                variant="contained" 
                style={{ marginTop: '20px', backgroundColor: colors.yellow, color: colors.primaryBlack }}
                type="submit"
              >
                Iniciar sesión
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

const Signin = () => {
  return (
    <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
      <Typography variant="h2" align="center" style={{ marginBottom: '20px', color: colors.white }}>Inicio de Sesión</Typography>
      <Form />
      <footer style={{ marginTop: '20px', textAlign: 'center', backgroundColor: colors.primaryBlack, color: colors.white }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Brigadistas Unidos
        </Typography>
      </footer>
    </div>
  );
};

export default Signin;
