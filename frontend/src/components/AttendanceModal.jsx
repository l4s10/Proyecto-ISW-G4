import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem'; // Importa el componente MenuItem para el Select

function AttendanceModal({ isOpen, onClose, selectedDate, onSaveAttendance }) {
    // Estado local para almacenar la asistencia ingresada
    const [attendanceData, setAttendanceData] = useState({
        brigadista: '',
        markType: '',
    });

    // Estado local para controlar la fecha seleccionada
    const [selectedAttendanceDate, setSelectedAttendanceDate] = useState('');

    // Manejar cambios en el formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAttendanceData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegisterAttendance = async () => {
        try {
            const response = await axios.post('/api/', { // Cambia la URL por la ruta correcta en tu backend
                date: selectedAttendanceDate,
                brigadista: attendanceData.brigadista,
                markType: attendanceData.markType,
            });

            // Aquí obtendrías el objeto de la asistencia creada en el backend desde la respuesta
            const newAttendance = response.data;

            // Llamamos a la función onSaveAttendance para actualizar la lista de asistencias en el frontend
            onSaveAttendance(newAttendance);

            // Cerramos el modal
            onClose();
        } catch (error) {
            console.error('Error al guardar la asistencia:', error.message);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Registrar Asistencia</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Aquí puedes registrar la asistencia para la fecha: {selectedDate}
                </DialogContentText>
                <br />
                {/* Formulario para ingresar datos de asistencia */}
                <form>
                    <Box mb={2}>
                        <TextField
                            id="date"
                            label="Fecha"
                            type="date"
                            name="date"
                            value={selectedAttendanceDate || ''}
                            onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            id="brigadista"
                            label="Nombre del Brigadista"
                            type="text"
                            name="brigadista"
                            value={attendanceData.brigadista}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    {/* Agregar el Select para elegir entre "ENTRADA" y "SALIDA" */}
                    <Box mb={2}>
                        <TextField
                            id="markType"
                            label="Tipo de marca"
                            select // Indica que es un Select
                            name="markType"
                            value={attendanceData.markType}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="ENTRADA">ENTRADA</MenuItem>
                            <MenuItem value="SALIDA">SALIDA</MenuItem>
                        </TextField>
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleRegisterAttendance} color="primary">
                    Registrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AttendanceModal;
