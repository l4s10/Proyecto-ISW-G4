'use client';

import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import api from "@/api/rootAPI";
import Link from 'next/link';
import CalendarAttendance from "@/components/CalendarAttendance";
import { colors } from "@/utils/colors";
import useAuth from "@/hooks/useAuth";
import BackHome from '@/components/BackHome';
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {
    const [asistencias, setAsistencias] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        if (!auth.token) return;

        const fetchData = async () => {
            try {
                const res = auth.user.roles.includes('64b9468015f4e5e680586755')
                    ? await api.get('/asistencias')
                    : await api.get(`/asistencias/usuario/${auth.user._id}`);

                setAsistencias(res.data.attendances);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [auth.token]);

    if (!auth.token) {
        return <BackHome />;
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                <Typography>Cargando asistencias...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Error al cargar los datos: {error.message}
            </div>
        );
    }

    return (
        <>
            <Navbar/>
            <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
                <Typography variant="h2" style={{marginTop: '20px', textAlign: 'center'}}>Modulo asistencias</Typography>
                <br></br>
                {auth.user.roles.includes('64b9468015f4e5e680586755') && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                                <CardHeader title="Registrar Asistencia" style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} />
                                <CardContent style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                                    <Typography variant="body1">
                                        Aquí puedes registrar una nueva asistencia.
                                    </Typography>
                                    <br></br>
                                    <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                                        <Link href='asistencias/registrar'>Registrar Nueva Asistencia</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                                <CardHeader title="Gestionar Asistencias" style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} />
                                <CardContent style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                                    <Typography variant="body1" >
                                        Aquí puedes revisar y gestionar las asistencias de los brigadistas.
                                    </Typography>
                                    <br></br>
                                    <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                                        <Link href='asistencias/gestionar'>Revisar</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
                <Typography style={{ padding: '20px 0',textAlign: 'center'}} variant="h4"> Calendario de asistencias </Typography>
                <CalendarAttendance eventos={asistencias} user={auth.user} />
        
                <footer style={{ marginTop: '20px', textAlign: 'center',backgroundColor: colors.primaryBlack, color: colors.white }}>
                    <Typography variant="body2">
                    © {new Date().getFullYear()} Brigadistas Unidos
                    </Typography>
                </footer>
            </div>
        </>
    );
}
