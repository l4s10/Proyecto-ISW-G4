"use strict";
const Remuneration = require("../models/remuneration.model");

/**
 * Crea una nueva remuneración en la base de datos con los datos proporcionados en el body.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con la remuneración creada.
 */
const createRemuneration = async (req, res) => {
  try {
    const { user, hoursWorked, salary } = req.body;
    const remuneration = new Remuneration({
      user,
      hoursWorked,
      salary,
    });

    await remuneration.save();

    res.status(201).json({ success: true, remuneration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Obtiene todas las remuneraciones almacenadas en la base de datos.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con todas las remuneraciones.
 */
const getRemunerations = async (req, res) => {
  try {
    const remunerations = await Remuneration.find().populate("user", "name").exec();

    res.status(200).json({ success: true, remunerations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * Borra una remuneración por su ID.
 *
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La respuesta JSON con el estado de la operación.
 */
const deleteRemuneration = async (req, res) => {
  try {
    const { id } = req.params;
    const remuneration = await Remuneration.findById(id);

    if (!remuneration) {
      return res.status(404).json({ success: false, message: "Remuneración no encontrada." });
    }

    await Remuneration.deleteOne({ _id: id });

    res.status(200).json({ success: true, message: "Remuneración borrada exitosamente." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createRemuneration,
  getRemunerations,
  deleteRemuneration,
};
