'use client';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
//para consumir api
import React, { useEffect, useState } from 'react';
import api from "@/api/rootAPI";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';


export default function Page() {
    //Hooks para cuadrillas
    const [cuadrillas, setCuadrillas] = useState([]);
    //Definimos funcion para obtener cuadrillas
    const fetchCuadrillas = async () => {
        try{
            const res = await api.get('/squad');
            console.log(res.data.squads);
            return res.data.squads;
        }catch(error){
            console.error('Error al obtener las cuadrillas:', error);
        }
    }
    
    useEffect (()=>{
        fetchCuadrillas().then(data => setCuadrillas(data));
        console.log(cuadrillas);
    }, []);

    return (
        <>
        <Navbar />
        <div>
            <Typography variant="h1">Hello, Cuadrillas page!</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Registrar Cuadrilla" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes registrar una nueva cuadrilla.
                    </Typography>
                    <Button variant="contained" color="primary">
                        <Link href='cuadrillas/registrar'>
                        Registrar Nueva Cuadrilla
                        </Link>
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Ver Cuadrillas" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes ver las cuadrillas registradas.
                    </Typography>
                    <Button variant="contained" color="secondary">
                    Ver Cuadrillas
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="right">Cuadrilla</TableCell>
                            <TableCell align="right">Jefe de cuadrilla</TableCell>
                            <TableCell align="right">Otros miembros</TableCell>


                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {cuadrillas?.map((cuadrilla) => (
                            <TableRow
                            key={cuadrilla._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right">{cuadrilla.name}</TableCell>
                            <TableCell align="right">{cuadrilla.squadLeader.name}</TableCell>
                            <TableCell align="right">
                                {cuadrilla.brigadistas?.map((brigadista) => (
                                    <p key={brigadista._id}>{brigadista.name}</p>
                                ))}
                            </TableCell>


                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
        </div>
        </>
    );
}

