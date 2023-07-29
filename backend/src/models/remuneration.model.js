"use strict";
const mongoose = require("mongoose");

const remunerationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Remuneration = mongoose.model("Remuneration", remunerationSchema);

module.exports = Remuneration;
