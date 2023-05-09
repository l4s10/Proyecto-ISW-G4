// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Inmporta el controlador de asistencias
const asistenciaController = require("../controllers/Asis.controller.js");
// Crea una instancia del enrutador
const router = express.Router();

// Ruta para obtener todas las asistencias
router.get("/asistencias", asistenciaController.obtenerAsistencias);

// Ruta para obtener una asistencia por ID
router.get("/asistencias/:id", asistenciaController.obtenerAsistenciaPorId);

// Ruta para crear una nueva asistencia
router.post("/asistencias", asistenciaController.crearAsistencia);

// Ruta para actualizar una asistencia por ID
router.patch("/asistencias/:id", asistenciaController.actualizarAsistenciaPorId);

// Ruta para eliminar una asistencia por ID
router.delete("/asistencias/:id", asistenciaController.eliminarAsistenciaPorId);

module.exports = router;
