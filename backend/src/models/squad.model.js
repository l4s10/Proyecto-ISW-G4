// squad.model.js
"use strict";
const mongoose = require("mongoose");

// En este esquema se encuentra el nombre de la cuadrilla, el lider y los miembros.

const squadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    squadLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    brigadistas: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ],
});

const Squad = mongoose.model("Squad", squadSchema);

module.exports = Squad;
