'use client';

import { useEffect } from 'react';
import TablaAsistencias from '@/components/TablaAsistencias';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Button from "@mui/material/Button";
import { colors } from "@/utils/colors";
import useAuth from "@/hooks/useAuth";

export default function BrigadaAsistencias() {
    const { token, user } = useAuth();
    const isAdmin = user && user.roles && user.roles.includes('64b9468015f4e5e680586755');

    useEffect(() => {
        // Si no hay token, redirigir al usuario a la página de inicio de sesión
        if (!token) {
            window.location.href = '/signin';
        }
    }, [token]);

    if (!token || !isAdmin) {
        // Si no hay token o el usuario no es un administrador, redirigirlo a la página de asistencias
        window.location.href = '/asistencias';
        // Puedes retornar un componente de carga o un mensaje mientras ocurre la redirección
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Cargando...</Typography>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: colors.secondaryBlack, minHeight: '100vh', padding: '1rem' }}>
                <Card style={{ backgroundColor: colors.primaryBlack }}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{ color: colors.white }} >
                            Asistencias de la Brigada
                        </Typography>
                        <Typography variant="body1" style={{ color: colors.white }}>
                            Aquí puedes ver las asistencias registradas por cada brigada.
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: colors.orange, color: colors.primaryBlack }}>
                            <Link href="/asistencias">Volver al menu</Link>
                        </Button>
                        <TablaAsistencias /> {/* Aquí llamamos al componente TablaAsistencias */}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
