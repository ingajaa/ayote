'use strict';

const UserProfile = require('../models/userProfile');

module.exports.getAll = async function getAll(req, res) {
  res.send(await UserProfile.find({}));
};

module.exports.getById = async function getById(req, res) {
  const { id } = await req.params;
  res.send(await UserProfile.find({ userId: id }));
};

module.exports.addOne = async function addOne(req, res) {
  const userProfile = new UserProfile(await req.body);
  res.send(await userProfile.save());
};

module.exports.updateOne = async function updateOne(req, res) {
  const { id } = await req.params;
  const body = await req.body;
  console.log(id);
  console.log(body);
  res.send(await UserProfile.findOneAndUpdate({ userId: id }, { $set: body }, { new: true }));
};
