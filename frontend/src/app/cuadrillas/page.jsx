'use client';
import Typography from "@mui/material/Typography";
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
// Importaciones adicionales
import { Button } from "@mui/material";
import Swal from 'sweetalert2';

export default function Page() {
  // Hooks para cuadrillas
  const [cuadrillas, setCuadrillas] = useState([]);

  // Definimos funcion para obtener cuadrillas
  const fetchCuadrillas = async () => {
    try {
      const res = await api.get('/squad');
      console.log(res.data.squads);
      return res.data.squads;
    } catch (error) {
      console.error('Error al obtener las cuadrillas:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar esto!'
    });

    if (result.isConfirmed) {
      try {
        const res = await api.delete(`/squad/${id}`);
        if (res.status === 200) {
          Swal.fire(
            'Borrado!',
            'La cuadrilla ha sido eliminada.',
            'success'
          );
          fetchCuadrillas().then(data => setCuadrillas(data));
        } else {
          Swal.fire(
            'Error!',
            'No se pudo borrar la cuadrilla.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'No se pudo borrar la cuadrilla.',
          'error'
        );
      }
    }
  };

  useEffect(() => {
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
                <TableCell>Cuadrilla</TableCell>
                <TableCell>Jefe de cuadrilla</TableCell>
                <TableCell>Otros miembros</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuadrillas?.map((cuadrilla) => (
                <TableRow
                  key={cuadrilla._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{cuadrilla.name}</TableCell>
                  <TableCell>{cuadrilla.squadLeader.name}</TableCell>
                  <TableCell>
                    {cuadrilla.brigadistas?.map((brigadista) => (
                      <p key={brigadista._id}>{brigadista.name}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    <Link href={`/cuadrillas/editar/${cuadrilla._id}`}>
                        Editar
                    </Link>
                   </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(cuadrilla._id)}>
                    Eliminar
                    </Button>
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
