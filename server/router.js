"use strict";

const router = require("express").Router();
const Meal = require("./controllers/meal");

router.get("/meals", Meal.getAll);
router.post("/meals", Meal.addOne);

module.exports = router;
