"use strict";
const Attendance = require("../models/attendance.model");

// Controlador para crear una nueva asistencia
/**
 * Crea una nueva asistencia en la base de datos con los datos proporcionados en el body.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con la asistencia creada.
 */
const createAttendance = async (req, res) => {
    try {
        const { brigadista, date, markType } = req.body;
         // Creamos una nueva instancia de Attendance con los datos recibidos en el body
        const attendance = new Attendance({
            brigadista,
            date,
            markType,
        });

        // Guardamos la nueva asistencia en la base de datos
        await attendance.save();

        // Enviamos una respuesta exitosa al cliente
        res.status(201).json({ success: true, attendance });
    } catch (error) {
        // En caso de haber un error, enviamos una respuesta con el código de error y el mensaje correspondiente
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controlador para obtener todas las asistencias
/**
 * Obtiene todas las asistencias almacenadas en la base de datos.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con todas las asistencias.
 */
const getAttendances = async (req, res) => {
    try {
        // Obtenemos todas las asistencias de la base de datos
        const attendances = await Attendance.find()
            .populate("brigadista", "name")
            .exec();

        // Enviamos las asistencias al cliente
        res.status(200).json({ success: true, attendances });
    } catch (error) {
        // En caso de haber un error, enviamos una respuesta con el código de error y el mensaje correspondiente
        res.status(500).json({ success: false, message: error.message });
    }
};
/**
 * Actualiza una asistencia existente en la base de datos con los datos proporcionados en el body.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con la asistencia actualizada.
 */
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { brigadista, date, markType } = req.body;

        // Buscamos la asistencia por su id y la actualizamos con los nuevos datos
        const attendance = await Attendance.findByIdAndUpdate(
            id,
            { brigadista, date, markType },
            { new: true },
        );

        // Si la asistencia no existe, enviamos una respuesta con un código de error
        if (!attendance) {
        return res.status(404).json({ success: false, message: "Attendance not found" });
        }

        // Enviamos la asistencia actualizada al cliente
        res.status(200).json({ success: true, attendance });
    } catch (error) {
        // En caso de haber un error, enviamos una respuesta con el código de error y el mensaje correspondiente
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controlador para eliminar una asistencia existente
/**
 * Elimina una asistencia existente en la base de datos a partir de su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con un mensaje indicando que la asistencia ha sido eliminada.
 */
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos la asistencia por su id y la eliminamos de la base de datos
        const attendance = await Attendance.findByIdAndDelete(id);

        // Si la asistencia no existe, enviamos una respuesta con un código de error
        if (!attendance) {
        return res.status(404).json({ success: false, message: "Attendance not found" });
        }

        // Enviamos una respuesta exitosa al cliente
        res.status(200).json({ success: true, message: "Attendance deleted" });
    } catch (error) {
        // En caso de haber un error, enviamos una respuesta con el código de error y el mensaje correspondiente
        res.status(500).json({ success: false, message: error.message });
    }
};
/**
 * Obtener todas las asistencias de un usuario por su ID de objeto
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {Promise<void>}
 */
const obtenerAsistenciasPorUsuario = async (req, res) => {
    try {
        const { userId } = req.params;
        // Buscar las asistencias del usuario
        const attendances = await Attendance.find({ brigadista: userId });
        res.status(200).json({ success: true, attendances });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las asistencias del usuario" });
    }
};
module.exports = {
    Attendance,
    createAttendance,
    getAttendances,
    updateAttendance,
    deleteAttendance,
    obtenerAsistenciasPorUsuario,
};
