"use strict";

const mongoose = require("./");

// Define schema
const userSchema = {
  first_name: String,
  last_name: String,
  city: String,
};

// Create model
const User = mongoose.model("User", userSchema);

module.exports = User;
