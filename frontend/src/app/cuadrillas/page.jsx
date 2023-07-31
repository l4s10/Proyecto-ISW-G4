'use client';

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from 'react';
import api from "@/api/rootAPI";
import { colors } from "@/utils/colors";
import Link from 'next/link';
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import FormularioEditarCuadrilla from '@/components/FormularioEditarCuadrilla';
import CuadrillasTable from '@/components/CuadrillasTable'; // Importación del componente CuadrillasTable

export default function Page() {
  const [cuadrillas, setCuadrillas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCuadrilla, setSelectedCuadrilla] = useState(null);

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
        const res = await api.delete('/squad/${id}');
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
        <Grid container spacing={2} justifyContent="center">
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
        </Grid>
        <br />
        <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>Lista de Cuadrillas</Typography>

        <CuadrillasTable cuadrillas={cuadrillas} handleEdit={handleEdit} handleDelete={handleDelete} />

        <footer style={{ marginTop: '20px', textAlign: 'center', backgroundColor: colors.primaryBlack, color: colors.white }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Brigadistas Unidos
          </Typography>
        </footer>

        {isModalOpen && (
          <FormularioEditarCuadrilla
            cuadrilla={selectedCuadrilla}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdate={() => {
              fetchCuadrillas().then(data => setCuadrillas(data));
            }}
          />
        )}
      </div>
    </>
  );
}
