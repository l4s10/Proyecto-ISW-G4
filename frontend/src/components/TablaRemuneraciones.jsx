'use client';

import { Button, TableCell, TableContainer, TableRow, Table, TableBody, TableHead, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import api from '@/api/rootAPI';  // Asegúrate de importar tu módulo de API aquí
import Swal from 'sweetalert2';  // Importa SweetAlert2

function TablaRemuneraciones({ initialRemunerations }) {
  const [remunerations, setRemunerations] = useState(initialRemunerations);
  const theme = useTheme();

  const fetchRemunerations = async () => {
    try {
      const res = await api.get('/remuneraciones');
      if (res.data && res.data.success && Array.isArray(res.data.remunerations)) {
        setRemunerations(res.data.remunerations);
      } else {
        console.error('Error fetching remunerations: response data does not contain an array of remunerations');
      }
    } catch (error) {
      console.error('Error fetching remunerations:', error);
    }
  };

  const handleEdit = (id) => {
    // Aquí puedes manejar la lógica para editar la remuneración
    console.log(`Editar remuneración con id ${id}`);
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
        const res = await api.delete(`remuneraciones/${id}`);
        if (res.status === 200) {
          Swal.fire(
            'Borrado!',
            'La remuneración ha sido eliminada.',
            'success'
          );
          fetchRemunerations();
        } else {
          Swal.fire(
            'Error!',
            'No se pudo borrar la remuneración.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'No se pudo borrar la remuneración.',
          'error'
        );
      }
    }
  };

  useEffect(() => {
    fetchRemunerations();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Horas Trabajadas</TableCell>
            <TableCell>Salario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {remunerations.map(remuneration => (
            <TableRow key={remuneration._id}>
              <TableCell>{remuneration.user.name}</TableCell>
              <TableCell>{remuneration.hoursWorked}</TableCell>
              <TableCell>{remuneration.salary}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginRight: theme.spacing(1)}}
                  onClick={() => handleEdit(remuneration._id)}
                >
                  Editar
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleDelete(remuneration._id)}
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

export default TablaRemuneraciones;
