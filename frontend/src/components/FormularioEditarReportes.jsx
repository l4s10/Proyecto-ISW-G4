'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem'; // Agrega la importación de MenuItem
import styled from 'styled-components'; // Agrega la importación de styled-components
import api from '@/api/rootAPI';
import { colors } from '../utils/colors';

    const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

    /* Establece el ancho máximo y centra el modal en la pantalla */
    max-width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;

    const FormularioEditarReportes = ({ reporte, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        usuario: '',
        fecha: new Date(),
        descripcion: '',
    });

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
        try {
            const res = await api.get('/usuarios');
            if (res.data && res.data.success && Array.isArray(res.data.usuarios)) {
            setUsuarios(res.data.usuarios);
            } else {
            console.error('Error fetching usuarios: response data does not contain an array of usuarios');
            }
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (reporte) {
        setFormData({
            titulo: reporte.titulo,
            usuario: reporte.usuario._id,
            fecha: new Date(reporte.fecha),
            descripcion: reporte.descripcion,
        });
        }
    }, [reporte]);

    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (event) => {
        setFormData({
        ...formData,
        fecha: event.target.value,
        });
    };

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
            await api.put(`/reportes/${reporte._id}`, formData);
            alert('Reporte actualizado exitosamente.');
            onUpdate(); // Llama a onUpdate cuando la cuadrilla se actualiza exitosamente
            onClose();
            } catch (error) {
            alert('Error al guardar el reporte.');
            console.error(error);
            }
        };

    return (
        <Modal open={isOpen} onClose={onClose}>
        <FormContainer component="form" onSubmit={handleSubmit} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
            {reporte ? 'Editar Reporte' : 'Registrar Reporte'}
            </Typography>
            <TextField
            label="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            fullWidth
            required
            />
            <br />
            <TextField
            select
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            fullWidth
            required
            >
            {usuarios.map((usuario) => (
                <MenuItem key={usuario._id} value={usuario._id}>
                {usuario.name}
                </MenuItem>
            ))}
            </TextField>
            <br />
            <TextField
            type="datetime-local"
            label="Fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleDateChange}
            fullWidth
            required
            />
            <br />
            <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
            />
            <br />
            <Button
            variant="contained"
            style={{ backgroundColor: colors.green, color: colors.primaryBlack }}
            type="submit"
            >
            {reporte ? 'Actualizar Reporte' : 'Registrar Reporte'}
            </Button>
            <br />
            <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: colors.orange, color: colors.primaryBlack }}
            onClick={onClose}
            >
            Cancelar
            </Button>
        </FormContainer>
        </Modal>
    );
    };

export default FormularioEditarReportes;
