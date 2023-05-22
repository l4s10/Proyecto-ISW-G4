"use strict";
const mongoose = require("mongoose");

// Creamos el schema con 3 campos, el brigadista, la fecha y el tipo de marcación por día.
const attendanceSchema = new mongoose.Schema({
    brigadista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    markType: {
        type: String,
        enum: ["ENTRADA", "SALIDA"],
        required: true,
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
