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
import Link from 'next/link';
import { colors } from '../../utils/colors';


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
      <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
        <Typography variant="h1">Hello, Reportes page!</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card style={{ backgroundColor: colors.primaryBlack, color: colors.white }}>
              <CardHeader style={{ backgroundColor: colors.primaryBlack, color: colors.white }} title="Registrar Reporte" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes registrar un nuevo reporte.
                </Typography>
                <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                  <Link href='/reportes/registrar'>Registrar nuevo reporte</Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card style={{ backgroundColor: colors.primaryBlack, color: colors.white }}>
              <CardHeader style={{ backgroundColor: colors.primaryBlack, color: colors.white }} title="Ver Reportes" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes ver los reportes registrados.
                </Typography>
                <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                  Ver Reportes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <TablaReportes  initialReportes={reportes}></TablaReportes>
      </div>
    </>
  );
}
