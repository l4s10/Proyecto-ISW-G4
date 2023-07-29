'use client';
import { useState, useEffect } from 'react';
import api from '@/api/rootAPI'; 

function useUserAttendances(userId) {
    const [attendances, setAttendances] = useState([]);
    const [hoursWorked, setHoursWorked] = useState(0);

    const calculateHoursWorked = (attendances) => {
        let totalHours = 0;
        attendances.sort((a, b) => new Date(a.date) - new Date(b.date));

        let entryTime;
        let exitTime;

        for (const attendance of attendances) {
        if (attendance.markType === 'ENTRADA') {
            entryTime = new Date(attendance.date);
        } else if (attendance.markType === 'SALIDA') {
            exitTime = new Date(attendance.date);

            if (entryTime && exitTime) {
            const diff = exitTime - entryTime;
            totalHours += diff / 1000 / 60 / 60;
            }
            entryTime = undefined;
            exitTime = undefined;
        }
        }
        return totalHours;
    };

    useEffect(() => {
        const fetchUserAttendances = async () => {
        try {
            const res = await api.get(`/asistencias/usuario/${userId}`);
            if (res.data && res.data.success && Array.isArray(res.data.attendances)) {
            setAttendances(res.data.attendances);
            setHoursWorked(calculateHoursWorked(res.data.attendances));
            } else {
            console.error('Error fetching user attendances: response data does not contain an array of attendances');
            }
        } catch (error) {
            console.error('Error fetching user attendances:', error);
        }
        };

        if (userId) {
        fetchUserAttendances();
        }
    }, [userId]);

    return { attendances, hoursWorked };
}

export default useUserAttendances;
