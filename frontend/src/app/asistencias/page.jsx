'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Navbar from '@/components/Navbar';
import api from '@/api/rootAPI';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import CalendarAttendance from '@/components/CalendarAttendance';

export default function Page() {
    const [asistencias, setAsistencias] = useState([]);

    const fetchData = async () => {
        const res = await api.get('/asistencias');
        console.log(res.data.attendances);
        return res.data.attendances;
    };

    useEffect(() => {
        fetchData().then(res => setAsistencias(res));
    }, []);

    return (
        <>
        <Navbar />
        <div style={{ padding: '20px' }}>
            <Typography variant="h1">Sistema de Asistencias</Typography>
            <Typography variant="h5" gutterBottom>
            Bienvenido a nuestro sistema de asistencias. Aquí puedes registrar y ver las asistencias de los brigadistas.
            </Typography>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Registrar Asistencia" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes registrar una nueva asistencia.
                    </Typography>
                    <Button variant="contained" color="primary">
                    <Link href="asistencias/registrar">Registrar Nueva Asistencia</Link>
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Ver Asistencias" />
                <CardContent>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Brigadista</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Tipo de Marca</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {asistencias?.map(asistencia => (
                            <TableRow key={asistencia._id}>
                            <TableCell>{asistencia.brigadista.name}</TableCell>
                            <TableCell align="center">{asistencia.date}</TableCell>
                            <TableCell align="center">{asistencia.markType}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
        </div>
        <div style={{ marginTop: '20px' }}>
            <CalendarAttendance eventos={asistencias} />
        </div>
        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="body2">
            © {new Date().getFullYear()} Brigadistas Unidos
            </Typography>
        </footer>
        </>
    );
    }
