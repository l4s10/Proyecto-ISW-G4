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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Page() {
    const [asistencias, setAsistencias] = useState([])

    const fetchData = async() => {
        const res = await api.get('/asistencias')
        return res.data.attendances
    }
    useEffect (()=>{
        fetchData().then(res => setAsistencias(res))
        console.log(asistencias)
    }, [])
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
                    Registrar Nueva Asistencia
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
                            <TableCell align="right">Brigadista</TableCell>
                            <TableCell align="right">fecha</TableCell>
                            <TableCell align="right">Tipo de marca</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {asistencias?.map((asistencia) => (
                            <TableRow
                            key={asistencia._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right">{asistencia.brigadista}</TableCell>
                            <TableCell align="right">{asistencia.date}</TableCell>
                            <TableCell align="right">{asistencia.markType}</TableCell>
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
        </>
    );
}

