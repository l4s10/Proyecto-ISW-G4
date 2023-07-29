    import React from 'react';
    import FullCalendar from '@fullcalendar/react';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import esLocale from '@fullcalendar/core/locales/es';

    export default function CalendarAttendance({ eventos }) {
    // Mapea los tipos de marca a los colores correspondientes
    const colorsByMarkType = {
        ENTRADA: '#778D45', // Green color for ENTRADA
        SALIDA: '#FFA570', // Orange color for SALIDA
    };

    // Convierte las fechas al formato adecuado que FullCalendar espera
    const eventosFormateados = eventos.map(asistencia => ({
        title: 'Asistencia', // Puedes personalizar el título del evento como desees
        start: asistencia.date, // Utiliza la fecha del backend como la fecha del evento
        backgroundColor: colorsByMarkType[asistencia.markType], // Asigna el color correspondiente según el tipo de marca
        borderColor: colorsByMarkType[asistencia.markType], // El borde del evento tendrá el mismo color que el fondo
    }));

    return (
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={eventosFormateados} // Pasa el array de eventos formateados al componente FullCalendar
        eventContent={({ event }) => (
            <div style={{ backgroundColor: event.backgroundColor, color: 'white', padding: '4px', borderRadius: '4px', textAlign: 'center' }}>
            {event.title}
            </div>
        )}
        />
    );
    }

