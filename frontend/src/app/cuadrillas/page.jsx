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

import { colors } from '../../utils/colors';

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
import FormularioEditarCuadrilla from '@/components/FormularioEditarCuadrilla'; // Importa el componente FormularioEditarCuadrilla


export default function Page() {
  // Hooks para cuadrillas
  const [cuadrillas, setCuadrillas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCuadrilla, setSelectedCuadrilla] = useState(null);

 
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

  const handleEdit = (cuadrilla) => {
    setSelectedCuadrilla(cuadrilla);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCuadrilla(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCuadrillas().then(data => setCuadrillas(data));
    console.log(cuadrillas);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: colors.primaryBlack, color: colors.white, padding: '20px 0' }}>
        <Typography variant="h2" style={{ marginTop: '20px', textAlign: 'center' }}>Modulo de Cuadrillas</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
              <CardHeader style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} title="Registrar Cuadrilla" />
              <CardContent style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                <Typography  variant="body1">
                  Aquí puedes registrar una nueva cuadrilla.
                </Typography>
                <br />
                <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                  <Link href='/cuadrillas/registrar'>
                    Registrar Nueva Cuadrilla
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
              <CardHeader  style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} title="Ver Cuadrillas" />
              <CardContent style={{ backgroundColor: colors.secondaryBlack, color: colors.white }}>
                <Typography variant="body1">
                  Aquí puedes ver las cuadrillas registradas.
                </Typography>
                <br />
                <Button variant="contained" style={{ backgroundColor: colors.yellow, color: colors.primaryBlack }}>
                  Ver Cuadrillas
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>Lista de Cuadrillas</Typography>
        <TableContainer style={{ backgroundColor: colors.secondaryBlack, color: colors.white }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow> 
                <TableCell style={{ color: colors.white }} >Cuadrilla</TableCell>
                <TableCell style={{ color: colors.white }}>Jefe de cuadrilla</TableCell>
                <TableCell style={{ color: colors.white }}>Otros miembros</TableCell>
                <TableCell style={{ color: colors.white }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuadrillas?.map((cuadrilla) => (
                <TableRow
                  key={cuadrilla._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ color: colors.white }}>{cuadrilla.name}</TableCell>
                  <TableCell style={{ color: colors.white }}>{cuadrilla.squadLeader.name}</TableCell>
                  <TableCell style={{ color: colors.white }}>
                    {cuadrilla.brigadistas?.map((brigadista) => (
                      <p key={brigadista._id}>{brigadista.name}</p>
                    ))}
                  </TableCell>
                  <TableCell >
                    <Button variant="contained" style={{ backgroundColor: colors.green, color: colors.primaryBlack }} sx={{ mr: 1 }} onClick={() => handleEdit(cuadrilla)}>
                      Editar
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: colors.orange, color: colors.primaryBlack }} onClick={() => handleDelete(cuadrilla._id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <footer style={{ marginTop: '20px', textAlign: 'center', backgroundColor: colors.primaryBlack, color: colors.white }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Brigadistas Unidos
          </Typography>
        </footer>

        {/* Modal para editar o crear una cuadrilla */}
        {isModalOpen && (
          <FormularioEditarCuadrilla
            cuadrilla={selectedCuadrilla}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdate={() => {
              // Actualiza la lista de cuadrillas después de editar o crear una nueva cuadrilla
              fetchCuadrillas().then(data => setCuadrillas(data));
            }}
          />
        )}
      </div>
    </>
  );
}
