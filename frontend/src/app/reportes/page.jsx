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
import { colors } from "@/utils/colors";
import useAuth from "@/hooks/useAuth";

const ReportesPage = () => {
  const { token, user } = useAuth();
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        let res;
        //Para rol administrador (por id)
        if(user.roles.includes('64b9468015f4e5e680586755')) {
          res = await api.get('/reportes');
        } else {
          res = await api.get(`/reportes/usuario/${user._id}`);
        }
        if (res.data && res.data.success && Array.isArray(res.data.reportes)) {
          setReportes(res.data.reportes);
          console.log(reportes);
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
        <Typography variant="h2" align="center" style={{ marginBottom: '20px' }}>Modulo de Reportes</Typography>
        {token && user.roles.includes('64b9468015f4e5e680586755') && (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                <CardHeader style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} title="Registrar Reporte" />
                <CardContent>
                  <Typography variant="body1">
                    Aquí puedes registrar un nuevo reporte.
                  </Typography>
                  <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack, marginTop: '10px' }}>
                    <Link href='/reportes/registrar'>Registrar nuevo reporte</Link>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: colors.primaryBlack, color: colors.white }}>
          <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>Lista de Reportes</Typography>
          <TablaReportes initialReportes={reportes} />
        </div>
        <footer style={{ marginTop: '20px', textAlign: 'center',backgroundColor: colors.primaryBlack, color: colors.white }}>
                  <Typography variant="body2">
                  © {new Date().getFullYear()} Brigadistas Unidos
                  </Typography>
        </footer>
      </div>
    </>
  );
};

export default ReportesPage;
