'use client';

import React from 'react';
import TablaAsistencias from '@/components/TablaAsistencias'; // Asegúrate de ajustar la ruta de importación
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Button from "@mui/material/Button";
import { colors } from '../../../utils/colors';

export default function BrigadaAsistencias() {
    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: colors.secondaryBlack, minHeight: '100vh', padding: '1rem' }}>
                <Card >
                    <CardContent>
                        <Typography variant="h4" component="div" >
                            Asistencias de la Brigada
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
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

