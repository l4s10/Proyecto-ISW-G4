"use strict";

const Squad = require("../models/squad.model");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * Obtener todas las cuadrillas.
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 */
async function getAllSquads(req, res, next) {
  try {
    const squads = await Squad.find()
      .populate("squadLeader", "name")
      .populate("brigadistas", "name")
      .exec();
    res.json(squads);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
}

/**
 * Crear una nueva cuadrilla.
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 */
async function createSquad(req, res, next) {
  try {
    const { name, squadLeader, brigadistas } = req.body;
    const squad = await Squad.create({ name, squadLeader, brigadistas });
    res.status(201).json(squad);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

/**
 * Obtener una cuadrilla por su ID.
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 */
async function getSquadById(req, res, next) {
  try {
    const { id } = req.params;
    const squad = await Squad.findById(id).populate("squadLeader", "name").populate("brigadistas", "name");
    if (!squad) {
      return res.status(404).json({ error: "Cuadrilla no encontrada." });
    }
    res.json(squad);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

/**
 * Actualizar una cuadrilla por su ID.
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 */
async function updateSquad(req, res, next) {
  try {
    const { id } = req.params;
    const { name, squadLeader, brigadistas } = req.body;
    const squad = await Squad.findByIdAndUpdate(
      id,
      { name, squadLeader, brigadistas },
      { new: true }
    );
    if (!squad) {
      return res.status(404).json({ error: "Cuadrilla no encontrada." });
    }
    res.json(squad);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

/**
 * Eliminar una cuadrilla por su ID.
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 */
async function deleteSquad(req, res, next) {
  try {
    const { id } = req.params;
    const squad = await Squad.findByIdAndDelete(id);
    if (!squad) {
      return res.status(404).json({ error: "Cuadrilla no encontrada." });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  getAllSquads,
  createSquad,
  getSquadById,
  updateSquad,
  deleteSquad,
};
