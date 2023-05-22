const express = require("express");
const router = express.Router();
const {
    createAttendance,
    getAttendances,
    updateAttendance,
    deleteAttendance,
    obtenerAsistenciasPorUsuario,
} = require("../controllers/attendance.controller");

// Ruta para crear una nueva asistencia
router.post("/", createAttendance);

// Ruta para obtener todas las asistencias
router.get("/", getAttendances);

// Ruta para actualizar una asistencia existente
router.put("/:id", updateAttendance);

// Ruta para eliminar una asistencia existente
router.delete("/:id", deleteAttendance);

// Ruta para obtener todas las asistencias de un usuario por su ID
router.get("/user/:userId", obtenerAsistenciasPorUsuario);

module.exports = router;
