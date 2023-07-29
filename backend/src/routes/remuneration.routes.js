"use strict";
const express = require("express");
const router = express.Router();
const {
    createRemuneration,
    getRemunerations,
    deleteRemuneration,
} = require("../controllers/remuneration.controller");

// Ruta para crear una nueva remuneración
router.post("/", createRemuneration);

// Ruta para obtener todas las remuneraciones
router.get("/", getRemunerations);

router.delete("/:id", deleteRemuneration);

module.exports = router;
