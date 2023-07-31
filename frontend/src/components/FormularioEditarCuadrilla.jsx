'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/system/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import api from '@/api/rootAPI';
import { colors } from '@/utils/colors';
import Swal from 'sweetalert2'

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

const Title = styled(Typography)`
    margin-bottom: 1rem;
    color: ${colors.primaryBlack};
`;

const SubmitButton = styled(Button)`
    background-color: ${colors.green};
    color: ${colors.primaryBlack};
    margin-top: 1rem;
`;

const CancelButton = styled(Button)`
    background-color: ${colors.orange};
    color: ${colors.primaryBlack};
    margin-top: 1rem;
`;

const FormularioEditarCuadrilla = ({ cuadrilla, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
    name: '',
    squadLeader: '',
    brigadistas: [],
});

const [users, setUsers] = useState([]);

useEffect(() => {
    const fetchUsers = async () => {
    try {
        const res = await api.get('/users');
        if (res.data && res.data.state === 'Success' && Array.isArray(res.data.data.users)) {
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
        if (cuadrilla) {
        setFormData({
            name: cuadrilla.name,
            squadLeader: cuadrilla.squadLeader._id,
            brigadistas: cuadrilla.brigadistas.map(brigadista => brigadista._id),
        });
        }
    }, [cuadrilla]);

    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };

    const handleBrigadistaChange = (index) => (event) => {
        const newBrigadistas = [...formData.brigadistas];
        newBrigadistas[index] = event.target.value;
        setFormData({
        ...formData,
        brigadistas: newBrigadistas,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/squad/${cuadrilla._id}`, formData);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cuadrilla actualizada exitosamente.',
            });
            onUpdate(); // Llama a onUpdate cuando la cuadrilla se actualiza exitosamente
            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'Error al guardar la cuadrilla.',
            });
            console.error(error);
        }
    };

return (
        <Modal open={isOpen} onClose={onClose}>
        <FormContainer component="form" onSubmit={handleSubmit} maxWidth="sm">
            <Title variant="h4" component="h1" gutterBottom>
            {cuadrilla ? 'Editar Cuadrilla' : 'Registrar Cuadrilla'}
            <InputLabel htmlFor="name">Titulo</InputLabel>
            </Title>
            <FormControl fullWidth>
            <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl fullWidth margin="normal">
            <br />
            <InputLabel htmlFor="squadLeader">Líder de la Cuadrilla</InputLabel>
            <Select
                id="squadLeader"
                name="squadLeader"
                value={formData.squadLeader}
                onChange={handleChange}
            >
                {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                    {user.name}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            {[...Array(formData.brigadistas.length + 1)].map((_, index) =>
            index < 4 ? (
                <FormControl fullWidth margin="normal" key={index}>
                <br />
                <InputLabel htmlFor={`brigadista-${index}`}>
                    Brigadista {index + 1}
                </InputLabel>
                <Select
                    id={`brigadista-${index}`}
                    value={formData.brigadistas[index] || ''}
                    onChange={handleBrigadistaChange(index)}
                >
                    {users.map((user) => (
                    <MenuItem
                        key={user._id}
                        value={user._id}
                        disabled={formData.brigadistas.includes(user._id)}
                    >
                        {user.name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            ) : null
            )}

            <SubmitButton variant="contained" type="submit">
            {cuadrilla ? 'Actualizar Cuadrilla' : 'Registrar Cuadrilla'}
            </SubmitButton>
            
            <CancelButton variant="contained" onClick={onClose}>
            CERRAR
            </CancelButton>
        </FormContainer>
        </Modal>
    );
};

export default FormularioEditarCuadrilla;
