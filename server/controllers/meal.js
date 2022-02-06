'use strict';

const Meal = require('../models/meal');

module.exports.getAll = async function getAll(req, res) {
  res.send(await Meal.find({}));
};

module.exports.addOne = async function addOne(req, res) {
  const meal = new Meal(req.body);
  res.send(await meal.save());
};

module.exports.deleteOne = async function deleteOne(req, res) {
  const { id } = await req.params;
  res.send(await Meal.deleteOne({ _id: id }));
};
