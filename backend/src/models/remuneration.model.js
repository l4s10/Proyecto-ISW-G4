// remuneration.model.js
"use strict";
const mongoose = require("mongoose");

const remunerationSchema = new mongoose.Schema({
    brigadista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    period: {
        type: Date,
        required: true,
    },
});

const Remuneration = mongoose.model("Remuneration", remunerationSchema);

module.exports = Remuneration;
