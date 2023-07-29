'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import api from '@/api/rootAPI';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Box from '@mui/system/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { colors } from '../utils/colors';

    const StyledFlatpickr = styled(Flatpickr)`
        width: 100%;
        margin: 1rem 0;
        padding: 0.7rem;
        border: 1px solid #0000001f;
        border-radius: 0.3rem;
    `;

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

    const FormularioEditarAsistencia = ({ asistencia, open, handleClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        brigadista: '',
        date: new Date(),
        markType: '',
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            if (res.data && res.data.state === "Success" && Array.isArray(res.data.data.users)) {
            setUsers(res.data.data.users);
            } else {
            console.error('Error fetching users: response data does not contain an array of users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (asistencia) {
        setFormData({
            brigadista: asistencia.brigadista._id,
            date: new Date(asistencia.date),
            markType: asistencia.markType,
        });
        }
    }, [asistencia]);

    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
        ...formData,
        date: date[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        await api.put(`/asistencias/${asistencia._id}`, formData);
        alert('Asistencia actualizada exitosamente.');
        onUpdate();  // Llama a onUpdate cuando la asistencia se actualiza exitosamente
        handleClose();
        } catch (error) {
        alert('Error al actualizar la asistencia.');
        console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
        <FormContainer component="form" onSubmit={handleSubmit} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
            Editar Asistencia
            </Typography>
            <FormControl fullWidth>
            <br />
            <InputLabel id="brigadista-label">Brigadista</InputLabel>
            <Select
                labelId="brigadista-label"
                name="brigadista"
                value={formData.brigadista}
                onChange={handleChange}
                fullWidth
            >
                {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                    {user.name}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <StyledFlatpickr
            data-enable-time
            options={{
                dateFormat: 'd-m-Y H:i',
                locale: Spanish,
            }}
            value={formData.date}
            onChange={handleDateChange}
            />
            <FormControl fullWidth>
            <br />
            <InputLabel id="mark-type-label">Tipo de Marca</InputLabel>
            <Select
                labelId="mark-type-label"
                name="markType"
                value={formData.markType}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value={"ENTRADA"}>ENTRADA</MenuItem>
                <MenuItem value={"SALIDA"}>SALIDA</MenuItem>
            </Select>
            </FormControl>
            <br />
            <Button variant="contained" style={{ backgroundColor: colors.green, color: colors.primaryBlack }} type="submit">
            Actualizar Asistencia
            </Button>
            <br />
            <Button variant="contained" style={{ backgroundColor: colors.orange, color: colors.primaryBlack }} onClick={handleClose}>
            Cerrar
            </Button>
        </FormContainer>
        </Modal>
    );
};

export default FormularioEditarAsistencia;
