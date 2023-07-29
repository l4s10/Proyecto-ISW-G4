'use client';

import { Button, TableCell, TableContainer, TableRow, Table, TableBody, TableHead, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';  // Asegúrate de importar tu módulo de API aquí
import Swal from 'sweetalert2';  // Importa SweetAlert2

function TablaReportes({ initialReportes }) {
  const [reportes, setReportes] = useState(initialReportes);
  const theme = useTheme();

  const fetchReportes = async () => {
    try {
      const res = await api.get('/reportes');
      if (res.data && res.data.success && Array.isArray(res.data.reportes)) {
        setReportes(res.data.reportes);
      } else {
        console.error('Error fetching reportes: response data does not contain an array of reportes');
      }
    } catch (error) {
      console.error('Error fetching reportes:', error);
    }
  };

  const handleEdit = (id) => {
    // Aquí puedes manejar la lógica para editar el reporte
    console.log(`Editar reporte con id ${id}`);
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
        const res = await api.delete(`reportes/${id}`);
        if (res.status === 200) {
          Swal.fire(
            'Borrado!',
            'El reporte ha sido eliminado.',
            'success'
          );
          fetchReportes();
        } else {
          Swal.fire(
            'Error!',
            'No se pudo borrar el reporte.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'No se pudo borrar el reporte.',
          'error'
        );
      }
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(reporte => (
            <TableRow key={reporte._id}>
              <TableCell>{reporte.titulo}</TableCell>
              <TableCell>{reporte.usuario.name}</TableCell>
              <TableCell>
                {
                  `Creado el: ${new Date(reporte.fecha).toLocaleDateString()} a las ${new Date(reporte.fecha).toLocaleTimeString()} horas`
                }
              </TableCell>
              <TableCell>{reporte.descripcion}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginRight: theme.spacing(1)}}
                  onClick={() => handleEdit(reporte._id)}
                >
                  Editar
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleDelete(reporte._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaReportes;