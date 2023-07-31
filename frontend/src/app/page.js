'use strict';

import React from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Link from 'next/link';
import { colors } from "@/utils/colors";
import Navbar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';

export default function Home() {
  return (
    <PrivateRoute>
      <Navbar/>
      <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
        <Typography variant="h2" align="center" style={{ marginBottom: '20px' }}>Brigadistas Unidos</Typography>
        <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white, margin: '0 20px' }}>
          <CardHeader style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} title="Bienvenido a Brigadistas Unidos" />
          <CardContent>
            <Typography variant="body1">
              Somos una comunidad de brigadistas comprometidos con el apoyo y la ayuda en casos de emergencia y desastres.
              Nuestro sistema cuenta con varios módulos, incluyendo:
            </Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Toma de asistencia:</Typography>
            <Typography variant="body1">
              Un módulo diseñado para registrar y llevar un seguimiento de la asistencia de los miembros en eventos y situaciones de emergencia.
            </Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Conformación de cuadrillas:</Typography>
            <Typography variant="body1">
              Un módulo que permite la organización y conformación de cuadrillas para la eficaz realización de las tareas.
            </Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Reportes:</Typography>
            <Typography variant="body1">
              Un módulo que permite la creación y gestión de reportes para mantener un registro de las acciones realizadas.
            </Typography>

            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Únete a nosotros para hacer la diferencia y ayudar a los necesitados.
            </Typography>
            <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack, marginTop: '10px' }}>
              <Link href='/signin'>Iniciar sesión</Link>
            </Button>
          </CardContent>
        </Card>
        <footer style={{ marginTop: '20px', textAlign: 'center',backgroundColor: colors.primaryBlack, color: colors.white }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Brigadistas Unidos
          </Typography>
        </footer>
      </div>
    </PrivateRoute>
  );
}
