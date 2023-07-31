const Reportes = require("../models/reportes.model");

/**
 * Obtener todos los reportes
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reportes.find()
      .populate("usuario", "name")
      .exec();
    // Enviamos las asistencias al cliente
    res.status(200).json({ success: true, reportes });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los reportes" });
  }
};

/**
 * Crear un nuevo reporte
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.crearReporte = async (req, res) => {
  try {
    const { titulo, usuario, fecha, descripcion } = req.body;

    const nuevoReporte = new Reportes({ titulo, usuario, fecha, descripcion });
    await nuevoReporte.save();

    res.status(201).json({ mensaje: "Reporte creado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el reporte" });
  }
};

/**
 * Obtener un reporte por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await Reportes.findById(req.params.id);
    if (reporte) {
      res.json(reporte);
    } else {
      res.status(404).json({ mensaje: "Reporte no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el reporte" });
  }
};

/**
 * Actualizar un reporte
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.actualizarReporte = async (req, res) => {
  try {
    const { titulo, usuario, fecha, descripcion } = req.body;
    const reporteActualizado = await Reportes.findByIdAndUpdate(req.params.id, {
      titulo,
      usuario,
      fecha,
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

/**
 * Eliminar un reporte
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.eliminarReporte = async (req, res) => {
  try {
    const reporteEliminado = await Reportes.findByIdAndRemove(req.params.id);
    if (reporteEliminado) {
      res.json({ mensaje: "Reporte eliminado exitosamente" });
    } else {
      res.status(404).json({ mensaje: "Reporte no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el reporte" });
  }
};

/**
 * Obtener todos los reportes asociados a un usuario por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
exports.obtenerReportesPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const reportes = await Reportes.find({ usuario: usuarioId })
      .populate("usuario", "name")
      .exec();

    // Verificar si se encontraron reportes para el usuario
    if (reportes.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron reportes para el usuario" });
    }

    // Enviamos los reportes al cliente
    res.status(200).json({ success: true, reportes });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los reportes del usuario" });
  }
};
