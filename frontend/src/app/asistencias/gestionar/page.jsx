'use client';

import React from 'react';
import TablaAsistencias from '@/components/TablaAsistencias'; // Asegúrate de ajustar la ruta de importación
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Button from "@mui/material/Button";

export default function BrigadaAsistencias() {
    return (
        <>
            <Navbar />
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="div">
                            Asistencias de la Brigada
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Aquí puedes ver las asistencias registradas por cada brigada.
                        </Typography>
                        <Button variant="contained" color="secondary">
                            <Link href="/asistencias">Volver al menu</Link>
                        </Button>
                        <TablaAsistencias /> {/* Aquí llamamos al componente TablaAsistencias */}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

