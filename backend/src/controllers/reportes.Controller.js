const Reporte = require("../models/reportes");

// Obtener todos los reportes
exports.obtenerReportes = async (req, res) => {
try {
    const reportes = await Reporte.find();
    res.json(reportes);
} catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los reportes" });
}
};

// Crear un nuevo reporte
exports.crearReporte = async (req, res) => {
try {
    const { fecha, asistencias, descripcion } = req.body;
    const nuevoReporte = new Reporte({ fecha, asistencias, descripcion });
    await nuevoReporte.save();
    res.status(201).json({ mensaje: "Reporte creado exitosamente" });
} catch (error) {
    res.status(500).json({ mensaje: "Error al crear el reporte" });
}
};

// Obtener un reporte por su ID
exports.obtenerReportePorId = async (req, res) => {
try {
    const reporte = await Reporte.findById(req.params.id);
    if (reporte) {
    res.json(reporte);
    } else {
    res.status(404).json({ mensaje: "Reporte no encontrado" });
    }
} catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el reporte" });
}
};

// Actualizar un reporte
exports.actualizarReporte = async (req, res) => {
try {
    const { fecha, asistencias, descripcion } = req.body;
    const reporteActualizado = await Reporte.findByIdAndUpdate(req.params.id, {
    fecha,
    asistencias,
    descripcion,
    });
    if (reporteActualizado) {
    res.json({ mensaje: "Reporte actualizado exitosamente" });
    } else {
    res.status(404).json({ mensaje: "Reporte no encontrado" });
    }
} catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el reporte" });
}
};

// Eliminar un reporte
exports.eliminarReporte = async (req, res) => {
try {
    const reporteEliminado = await Reporte.findByIdAndRemove(req.params.id);
    if (reporteEliminado) {
    res.json({ mensaje: "Reporte eliminado exitosamente" });
    } else {
    res.status(404).json({ mensaje: "Reporte no encontrado" });
    }
} catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el reporte" });
}
};
