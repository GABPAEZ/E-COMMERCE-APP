const mongoose = require("mongoose");

// schema
const orderSchema = mongoose.Schema({});

// model se lo llama en node = collection que se lo llama en mongo --> TABLA

exports.Order = mongoose.model("Order", orderSchema);
