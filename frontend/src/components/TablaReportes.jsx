'use client';

import { Button, TableCell, TableContainer, TableRow, Table, TableBody, TableHead, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';  // Asegúrate de importar tu módulo de API aquí
import Swal from 'sweetalert2';  // Importa SweetAlert2
import { colors } from '../utils/colors';
import FormularioEditarReportes from './FormularioEditarReportes';

function TablaReportes({ initialReportes }) {
  const [reportes, setReportes] = useState(initialReportes);
  const [selectedReporte, setSelectedReporte] = useState(null); // Nuevo estado
  const theme = useTheme();

  const fetchReportes = async () => {
    try {
      const res = await api.get('/reportes');
      if (res.data && res.data.success && Array.isArray(res.data.reportes)) {
        // Ordenamos los reportes por fecha de forma descendente antes de actualizar el estado
        const reportesOrdenados = res.data.reportes.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setReportes(reportesOrdenados);
      } else {
        console.error('Error fetching reportes: response data does not contain an array of reportes');
      }
    } catch (error) {
      console.error('Error fetching reportes:', error);
    }
  };

  const handleEdit = (id) => {
    // Aquí puedes manejar la lógica para editar el reporte
    const reporte = reportes.find((r) => r._id === id);
    setSelectedReporte(reporte);
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
    <TableContainer style={{ backgroundColor: colors.secondaryBlack }} component={Paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={{ color: colors.white }}>Titulo</TableCell>
            <TableCell style={{ color: colors.white }}>Usuario</TableCell>
            <TableCell style={{ color: colors.white }}>Fecha</TableCell>
            <TableCell style={{ color: colors.white }}>Descripcion</TableCell>
            <TableCell style={{ color: colors.white }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(reporte => (
            <TableRow key={reporte._id}>
              <TableCell style={{ color: colors.white }}>{reporte.titulo}</TableCell>
              <TableCell style={{ color: colors.white }}>{reporte.usuario.name}</TableCell>
              <TableCell style={{ color: colors.white }}>
                {
                  `Creado el: ${new Date(reporte.fecha).toLocaleDateString()} a las ${new Date(reporte.fecha).toLocaleTimeString()} horas`
                }
              </TableCell>
              <TableCell style={{ color: colors.white }}>{reporte.descripcion}</TableCell>
              <TableCell>
                <Button 
                  variant="contained"  
                  style={{backgroundColor: colors.green, color: colors.primaryBlack ,marginRight: theme.spacing(1)}}
                  onClick={() => handleEdit(reporte._id)}
                >
                  Editar
                </Button>
                <Button 
                  variant="contained" 
                  style={{backgroundColor: colors.orange, color: colors.primaryBlack}}
                  onClick={() => handleDelete(reporte._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FormularioEditarReportes
      reporte={selectedReporte}
      isOpen={!!selectedReporte}
      onClose={() => setSelectedReporte(null)}
      onUpdate={() => fetchReportes()}
    />
    </TableContainer>
    
  );
}

export default TablaReportes;