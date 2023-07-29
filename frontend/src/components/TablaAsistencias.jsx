'use client';

import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Swal from 'sweetalert2';
import FormularioEditarAsistencia from './FormularioEditarAsistencia';

export default function TablaAsistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [currentAsistencia, setCurrentAsistencia] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAsistencias = async () => {
    const res = await api.get('/asistencias');
    setAsistencias(res.data.attendances);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/asistencias/${id}`);
      Swal.fire('¡Eliminado!', 'La asistencia ha sido eliminada.', 'success');
      fetchAsistencias();
    } catch (error) {
      Swal.fire('Error!', 'Hubo un problema eliminando la asistencia.', 'error');
    }
  };

  const handleOpenModal = (asistencia) => {
    setCurrentAsistencia(asistencia);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchAsistencias(); // Agrega esta línea para refrescar la lista después de cerrar el modal
  };

  useEffect(() => {
    fetchAsistencias();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Brigadista</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asistencias.map((asistencia) => (
            <TableRow key={asistencia._id}>
              <TableCell>{asistencia.brigadista.name}</TableCell>
              <TableCell>
                {
                  `Marcó el dia: ${new Date(asistencia.date).toLocaleDateString()} a las ${new Date(asistencia.date).toLocaleTimeString()} horas`
                }
              </TableCell>
              <TableCell>{asistencia.markType}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleOpenModal(asistencia)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(asistencia._id)}>Eliminar</Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FormularioEditarAsistencia
        asistencia={currentAsistencia}
        open={openModal}
        handleClose={handleCloseModal}
        onUpdate={fetchAsistencias} // Paso fetchAsistencias como una prop a FormularioEditarAsistencia
      />
    </TableContainer>
  );
}
