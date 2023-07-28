'use client';
import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import TablaReportes from "@/components/TablaReportes";

export default function Page() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const res = await api.get('/reportes');
        if (res.data && res.data.success && Array.isArray(res.data.reportes)) {
          setReportes(res.data.reportes);
        } else {
          console.error('Error fetching reportes: response data does not contain an array of reportes');
        }
      } catch (error) {
        console.error('Error fetching reportes:', error);
      }
    };
    fetchReportes();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Typography variant="h1">Hello, Reportes page!</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Registrar Reporte" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes registrar un nuevo reporte.
                </Typography>
                <Button variant="contained" color="primary">
                  Registrar Nuevo Reporte
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Ver Reportes" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes ver los reportes registrados.
                </Typography>
                <Button variant="contained" color="secondary">
                  Ver Reportes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <TablaReportes reportes={reportes}></TablaReportes>
      </div>
    </>
  );
}
