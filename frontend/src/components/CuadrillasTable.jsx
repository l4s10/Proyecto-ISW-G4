'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { colors } from "@/utils/colors";
import React from 'react';

const CuadrillasTable = ({ cuadrillas, handleEdit, handleDelete }) => (
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
);

export default CuadrillasTable;
