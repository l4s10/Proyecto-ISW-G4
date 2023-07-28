'use client';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import api from "@/api/rootAPI";
import { useState, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CalendarAttendance from "@/components/CalendarAttendance";
import AttendanceModal from "@/components/AttendanceModal"; // Importa el componente de modal

export default function Page() {
    const [asistencias, setAsistencias] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventos, setEventos] = useState([]); // Define el estado 'eventos' para almacenar los eventos
    
    const handleOpenModal = (date) => {
        setModalOpen(true);
        setSelectedDate(date);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveAttendance = (date, attendanceData) => {
        // Lógica para guardar la asistencia en la fecha seleccionada
        // Por ejemplo, podrías hacer una llamada a la API para guardar los datos de asistencia.
        // Aquí puedes actualizar el estado "asistencias" con la nueva asistencia registrada.
        const newAttendance = {
        brigadista: attendanceData.brigadista,
        markType: attendanceData.markType,
        date: date,
        };
        setAsistencias((prevAsistencias) => [...prevAsistencias, newAttendance]);
        
        // Actualizar el estado 'eventos' para agregar la nueva asistencia al calendario
        setEventos((prevEventos) => [...prevEventos, { title: 'Asistencia', date: date }]);
    };

    useEffect(() => {
            const fetchData = async () => {
    try {
            const res = await api.get('/asistencias');
            setAsistencias(res.data.attendances);
    } catch (error) {
        console.error('Error al obtener asistencias:', error);
    }
    };
    fetchData();
    }, []);

        useEffect(() => {
            // Actualiza los eventos cada vez que cambie el estado 'asistencias'
            setEventos(
            asistencias.map((asistencia) => ({
                title: 'Asistencia', // Título del evento
                date: asistencia.date, // Fecha del evento
            }))
            );
        }, [asistencias]);
    
        return (
        <>
        <Navbar />
        <div>
            <Typography variant="h1">Hello, Asistencias page!</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Registrar Asistencia" />
                <CardContent>
                    <Typography variant="body1">
                    Aquí puedes registrar una nueva asistencia.
                    </Typography>
                    {/* Botón para abrir el modal */}
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)}>
                    Registrar Nueva Asistencia
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                <CardHeader title="Ver Asistencias" />
                <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="right">Brigadista</TableCell>
                            <TableCell align="right">fecha</TableCell>
                            <TableCell align="right">Tipo de marca</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {asistencias?.map((asistencia) => (
                            <TableRow
                            key={asistencia._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right">{asistencia.brigadista}</TableCell>
                            <TableCell align="right">{asistencia.date}</TableCell>
                            <TableCell align="right">{asistencia.markType}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
        </div>
        <div>
        </div>
        <div>
        {/* Componente del calendario con los eventos y evento para agregar un nuevo evento */}
        <CalendarAttendance eventos={eventos} onDateClick={(date) => handleOpenModal(date)} />
        </div>
            {/* Modal para registrar asistencia */}
            <AttendanceModal 
            isOpen={modalOpen}
            onClose={handleCloseModal}
            selectedDate={selectedDate}
            onSaveAttendance={handleSaveAttendance} 
        />
    </>
    );
}

