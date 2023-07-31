'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { colors } from '../utils/colors';

    export default function CalendarAttendance({ eventos }) {
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Mapea los tipos de marca a los colores correspondientes
    const colorsByMarkType = {
        ENTRADA: '#778D45', // Green color for ENTRADA
        SALIDA: '#FFA570', // Orange color for SALIDA
    };

    // Convierte las fechas al formato adecuado que FullCalendar espera
    const eventosFormateados = eventos.map((asistencia) => ({
        title: 'Asistencia', // Puedes personalizar el título del evento como desees
        start: asistencia.date, // Utiliza la fecha del backend como la fecha del evento
        backgroundColor: colorsByMarkType[asistencia.markType], // Asigna el color correspondiente según el tipo de marca
        borderColor: colorsByMarkType[asistencia.markType], // El borde del evento tendrá el mismo color que el fondo
        extendedProps: { asistencia }, // Agregamos la propiedad `asistencia` al evento para acceder a ella en el modal
    }));

    const handleEventClick = (info) => {
        setSelectedEvent(info.event.extendedProps.asistencia);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            events={eventosFormateados}
            eventContent={({ event }) => (
            <div
                style={{
                backgroundColor: event.backgroundColor,
                color: 'white',
                padding: '4px',
                borderRadius: '4px',
                textAlign: 'center',
                }}
            >
                {event.title}
            </div>
            )}
            eventClick={handleEventClick} // Agregamos el manejador de eventos para capturar el clic en un evento
        />
        <Modal open={Boolean(selectedEvent)} onClose={handleCloseModal}>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                maxWidth: 400,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            >
            {selectedEvent && (
                <>
                <h2>Detalles de la asistencia</h2>
                <br></br>
                <p>Usuario: {selectedEvent.brigadista.name}</p>
                <br></br>
                <p>Fecha: {new Date(selectedEvent.date).toLocaleString()}</p>
                <br></br>
                <p>Tipo: {selectedEvent.markType}</p>
                <br></br>
                {/* Agrega aquí más detalles o información adicional según tus necesidades */}
                <button style={{ backgroundColor: colors.orange, color: colors.primaryBlack }} onClick={handleCloseModal}>Cerrar</button>
                </>
            )}
            </Box>
        </Modal>
        </>
    );
}


