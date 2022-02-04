"use strict";

const mongoose = require(".");
const { Schema } = mongoose;

// Define schema
const mealSchema = new Schema(
  {
    userId: Number,
    foodId: Number,
    foodName: String,
    foodCategory: String,
    imageUrl: String,
    totalCalories: Number,
    totalCarbs: Number,
    totalProtein: Number,
    totalFat: Number,
    totalGrams: Number,
  },
  {
    timestamps: true,
  }
);

// Create model
const Meal = mongoose.model("Meals", mealSchema);

module.exports = Meal;
