const express = require("express");
const squadController = require("../controllers/squad.controller");

const router = express.Router();

// Rutas para las cuadrillas
router.get("/", squadController.getAllSquads);
router.post("/", squadController.createSquad);
router.get("/:id", squadController.getSquadById);
router.put("/:id", squadController.updateSquad);
router.delete("/:id", squadController.deleteSquad);
router.get("/user-squads/:userId", squadController.getUserSquads);

module.exports = router;
