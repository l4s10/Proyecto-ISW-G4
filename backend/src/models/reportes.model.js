const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});

const Reportes = mongoose.model("Reportes", reportSchema);

module.exports = Reportes;
