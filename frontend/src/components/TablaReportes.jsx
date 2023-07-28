'use client';
import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TablaReportes({ reportes }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Descripcion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(reporte => (
            <TableRow key={reporte._id}>
              <TableCell>{reporte.titulo}</TableCell>
              <TableCell>{reporte.usuario.name}</TableCell>
              <TableCell>{new Date(reporte.fecha).toLocaleDateString()}</TableCell>
              <TableCell>{reporte.descripcion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaReportes;
