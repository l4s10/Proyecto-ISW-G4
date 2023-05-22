const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportes.Controller");

// Ruta para obtener todos los reportes
router.get("/", reportesController.obtenerReportes);

// Ruta para crear un nuevo reporte
router.post("/", reportesController.crearReporte);

// Ruta para obtener un reporte por su ID
router.get("/:id", reportesController.obtenerReportePorId);

// Ruta para actualizar un reporte por su ID
router.put("/:id", reportesController.actualizarReporte);

// Ruta para eliminar un reporte por su ID
router.delete("/:id", reportesController.eliminarReporte);

module.exports = router;
