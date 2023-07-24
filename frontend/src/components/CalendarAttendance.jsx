import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// Importa las traducciones al español
import esLocale from '@fullcalendar/core/locales/es';

export default class CalendarAttendance extends React.Component {
    render() {
        return (
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                locale={esLocale} // Establece la traducción al español
            />
        )
    }
}