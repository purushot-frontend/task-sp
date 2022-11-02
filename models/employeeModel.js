const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
