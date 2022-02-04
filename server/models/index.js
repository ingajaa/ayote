"use strict";

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;

(async () => {
  await mongoose.connect(CONNECTION_STRING);
})();

module.exports = mongoose;
