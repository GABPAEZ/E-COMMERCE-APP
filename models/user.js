const mongoose = require("mongoose");

// schema
const userSchema = mongoose.Schema({});

// model se lo llama en node = collection que se lo llama en mongo --> TABLA

exports.User = mongoose.model("User", userSchema);
