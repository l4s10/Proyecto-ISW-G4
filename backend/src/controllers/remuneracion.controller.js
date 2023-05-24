"use strict";
const Attendance = require("./attendanceModel");

// Función para verificar la asistencia diaria de un usuario en la base de datos
async function verificarAsistenciaDiaria(userId, fecha) {
  try {
    // Buscar la asistencia del usuario en la fecha especificada
    const attendance = await Attendance.findOne({
      brigadista: userId,
      date: fecha,
    }).populate("brigadista");

    // Verificar si se encontró asistencia para el usuario en la fecha especificada
    if (attendance) {
      return `El usuario con ID ${userId} (${attendance.brigadista.nombre}) estuvo presente el día ${fecha}`;
    } else {
      return `El usuario con ID ${userId} no estuvo presente el día ${fecha}`;
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al verificar asistencia:", error);
    throw error;
  }
}

// Función para verificar si el brigadista asistió todos los días del mes
async function verificarAsistenciaMensual(userId, mes, anio) {
  try {
    // Obtener el primer y último día del mes
    const primerDiaMes = new Date(anio, mes - 1, 1);
    const ultimoDiaMes = new Date(anio, mes, 0);

    // Realizar la consulta para verificar la asistencia del brigadista en el rango de fechas del mes
    const asistenciaMes = await Attendance.find({
      brigadista: userId,
      date: { $gte: primerDiaMes, $lte: ultimoDiaMes },
    });

    // Verificar si el brigadista asistió todos los días del mes
    if (asistenciaMes.length === ultimoDiaMes.getDate()) {
      return true; // El brigadista asistió todos los días del mes
    } else {
      return false; // El brigadista no asistió todos los días del mes
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al verificar asistencia mensual:", error);
    throw error;
  }
}
