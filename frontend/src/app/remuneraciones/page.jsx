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
import TablaRemuneraciones from "@/components/TablaRemuneraciones";  // Asegúrate de crear este componente
import Link from 'next/link';


export default function Page() {
  const [remunerations, setRemunerations] = useState([]);

  useEffect(() => {
    const fetchRemunerations = async () => {
      try {
        const res = await api.get('/remuneraciones');
        if (res.data && res.data.success && Array.isArray(res.data.remunerations)) {
          setRemunerations(res.data.remunerations);
        } else {
          console.error('Error fetching remunerations: response data does not contain an array of remunerations');
        }
      } catch (error) {
        console.error('Error fetching remunerations:', error);
      }
    };
    fetchRemunerations();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Typography variant="h1">Hello, Remuneraciones page!</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Registrar Remuneración" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes registrar una nueva remuneración.
                </Typography>
                <Button variant="contained" color="primary">
                  <Link href='/remuneraciones/registrar'>Registrar nueva remuneración</Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Ver Remuneraciones" />
              <CardContent>
                <Typography variant="body1">
                  Aquí puedes ver las remuneraciones registradas.
                </Typography>
                <Button variant="contained" color="secondary">
                  Ver Remuneraciones
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <TablaRemuneraciones initialRemunerations={remunerations}></TablaRemuneraciones>
      </div>
    </>
  );
}
