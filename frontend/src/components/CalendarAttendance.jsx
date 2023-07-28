import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

    export default function CalendarAttendance({ eventos }) {
    // Convierte las fechas al formato adecuado que FullCalendar espera
    const eventosFormateados = eventos.map(asistencia => ({
        title: 'Asistencia', // Puedes personalizar el título del evento como desees
        start: asistencia.date, // Utiliza la fecha del backend como la fecha del evento
    }));

    return (
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={eventosFormateados} // Pasa el array de eventos formateados al componente FullCalendar
        />
    );
    }
