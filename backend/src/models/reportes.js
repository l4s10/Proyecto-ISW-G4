const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
fecha: {
    type: Date,
    required: true,
},
asistencias: {
    type: Number,
    required: true,
},
descripcion: {
    type: String,
    required: true,
},
});

const Reporte = mongoose.model("Reporte", reportSchema);

module.exports = Reporte;
