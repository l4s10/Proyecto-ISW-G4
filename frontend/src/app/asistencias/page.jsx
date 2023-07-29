'use client';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import api from "@/api/rootAPI";
import { useState, useEffect } from "react";
import Link from 'next/link';
import CalendarAttendance from "@/components/CalendarAttendance";

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
        <div>
            <Typography variant="h1">Hello, Asistencias page!</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card>
                    <CardHeader title="Registrar Asistencia" />
                    <CardContent>
                        <Typography variant="body1">
                        Aquí puedes registrar una nueva asistencia.
                        </Typography>
                        <Button variant="contained" color="primary">
                            <Link href='asistencias/registrar'>Registrar Nueva Asistencia</Link>
                        </Button>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                    <CardHeader title="Gestionar Asistencias" />
                    <CardContent>
                        <Typography variant="body1">
                        Aquí puedes revisar y gestionar las asistencias de los brigadistas.
                        </Typography>
                        <Button variant="contained" color="secondary">
                            <Link href='asistencias/gestionar'>Revisar</Link>
                        </Button>
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
