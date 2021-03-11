const mongoose = require("mongoose");

// schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  }
});

// model se lo llama en node = collection que se lo llama en mongo --> TABLA

exports.Category = mongoose.model("Category", categorySchema);
