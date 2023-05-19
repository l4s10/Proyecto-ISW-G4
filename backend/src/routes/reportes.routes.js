const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportesController");

// Ruta para obtener todos los reportes
router.get("/reportes", reportesController.obtenerReportes);

// Ruta para crear un nuevo reporte
router.post("/reportes", reportesController.crearReporte);

// Ruta para obtener un reporte por su ID
router.get("/reportes/:id", reportesController.obtenerReportePorId);

// Ruta para actualizar un reporte por su ID
router.put("/reportes/:id", reportesController.actualizarReporte);

// Ruta para eliminar un reporte por su ID
router.delete("/reportes/:id", reportesController.eliminarReporte);

module.exports = router;
