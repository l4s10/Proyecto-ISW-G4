// Importa el modelo de la asistencia
const Asistencia = require('../models/asis.model.js');

// Controlador para obtener todas las asistencias
const obtenerAsistencias = async (req, res) => {
try {
    const asistencias = await Asistencia.find();
    res.json(asistencias);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

// Controlador para obtener una asistencia por ID
const obtenerAsistenciaPorId = async (req, res) => {
try {
    const asistencia = await Asistencia.findById(req.params.id);
    if (asistencia) {
    res.json(asistencia);
    } else {
    res.status(404).json({ message: 'Asistencia no encontrada' });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

// Controlador para crear una nueva asistencia
const crearAsistencia = async (req, res) => {
const asistencia = new Asistencia({
    brigadista: req.body.brigadista,
    fecha: req.body.fecha,
    asistio: req.body.asistio,
    observaciones: req.body.observaciones,
});

try {
    const nuevaAsistencia = await asistencia.save();
    res.status(201).json(nuevaAsistencia);
} catch (error) {
    res.status(400).json({ message: error.message });
}
};

// Controlador para actualizar una asistencia por ID
const actualizarAsistenciaPorId = async (req, res) => {
try {
    const asistencia = await Asistencia.findById(req.params.id);

    if (asistencia) {
    asistencia.brigadista = req.body.brigadista || asistencia.brigadista;
    asistencia.fecha = req.body.fecha || asistencia.fecha;
    asistencia.asistio = req.body.asistio || asistencia.asistio;
    asistencia.observaciones = req.body.observaciones || asistencia.observaciones;

    const asistenciaActualizada = await asistencia.save();
    res.json(asistenciaActualizada);
    } else {
    res.status(404).json({ message: 'Asistencia no encontrada' });
    }
} catch (error) {
    res.status(400).json({ message: error.message });
}
};

// Controlador para eliminar una asistencia por ID
const eliminarAsistenciaPorId = async (req, res) => {
try {
    const asistencia = await Asistencia.findById(req.params.id);

    if (asistencia) {
    await asistencia.remove();
    res.json({ message: 'Asistencia eliminada correctamente' });
    } else {
    res.status(404).json({ message: 'Asistencia no encontrada' });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = {
obtenerAsistencias,
obtenerAsistenciaPorId,
crearAsistencia,
actualizarAsistenciaPorId,
eliminarAsistenciaPorId
};
