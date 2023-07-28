'use client';
//IMPORTAMOS LIBRERIAS
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//EQUIVALENTE A AXIOS
import api from '@/api/rootAPI';
//PARA MANEJO DE LAS RUTAS
import Link from 'next/link';

const AsistenciaForm = () => {
    //HOOKS
    const [formData, setFormData] = useState({
        brigadista: '',
        date: '',
        markType: '',
    });
    //EQUIVALENTE A UN LISTENER DE INPUT
    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };
    //ENVIAR LA ASISTENCIA
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/asistencias', formData);
            alert('Asistencia registrada exitosamente.');
            // Puedes redirigir a otra página aquí si lo deseas.
        } catch (error) {
        alert('Error al registrar la asistencia.');
        console.error(error);
        }
    };
    //RETORNA 'LA VISTA" -> FORMULARIO 😀
    return (
        <div>
        <Typography variant="h1">Registrar Asistencia</Typography>
        <form onSubmit={handleSubmit}>
            <TextField
            label="Brigadista"
            name="brigadista"
            value={formData.brigadista}
            onChange={handleChange}
            fullWidth
            />
            <TextField
            label="Fecha (Formato: AAAA-MM-DD)"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            />
            <TextField
            label="Tipo de Marca"
            name="markType"
            value={formData.markType}
            onChange={handleChange}
            fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
            Registrar Asistencia
            </Button>
            <Button variant='contained' color='secondary'>
                <Link href='asistencias'>Volver</Link>
            </Button>
        </form>
        </div>
    );
};

export default AsistenciaForm;
