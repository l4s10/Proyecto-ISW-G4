// attendance.model.js
"use strict";
const mongoose = require("mongoose");

// Creamos el schema con 3 campos, el brigadista, la fecha y el booleano si asistió por día.
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
    attended: {
        type: Boolean,
        required: true,
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
