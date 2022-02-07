'use strict';

const mongoose = require('.');

const userProfileSchema = {
  userId: Number,
  dailyCaloriesGoal: Number,
  dailyProteinGoal: Number,
  dailyCarbsGoal: Number,
  dailyFatGoal: Number,
  dailyGlassCountGoal: Number,
  dailyCaffeineCountGoal: Number
};

const UserProfile = mongoose.model('UserProfiles', userProfileSchema);

module.exports = UserProfile;
