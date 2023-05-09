// squad.model.js
"use strict";
const mongoose = require("mongoose");

const asistenciaSchema = new mongoose.Schema({
fecha: {
    type: Date,
    required: true,
},
brigadista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: true,
},
asistio: {
    type: Boolean,
    required: true,
},
observaciones: {
    type: String,
},
});

const Asistencia = mongoose.model("Asistencia", asistenciaSchema);

module.exports = Asistencia;
