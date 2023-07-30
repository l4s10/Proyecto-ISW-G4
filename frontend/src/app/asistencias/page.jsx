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
import { colors } from '../../utils/colors';


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
        <Navbar/>
        <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
            <Typography variant="h2" style={{marginTop: '20px', textAlign: 'center'}}>Modulo asistencias</Typography>
            <br></br>
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
            <Typography variant="h4"> Calendario de asistencias </Typography>
            <CalendarAttendance eventos={asistencias} />
            <footer style={{ marginTop: '20px', textAlign: 'center',backgroundColor: colors.primaryBlack, color: colors.white }}>
                <Typography variant="body2">
                © {new Date().getFullYear()} Brigadistas Unidos
                </Typography>
            </footer>
        </div>
        </>
    );
    }
