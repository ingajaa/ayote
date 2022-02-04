"use strict";

const User = require("../models/user");

module.exports.getAll = async function getAll(req, res) {
  res.send(await User.find({}));
};

module.exports.addOne = async function addOne(req, res) {
  const user = new User(req.body);
  res.send(await user.save());
};
