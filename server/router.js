'use strict';

const router = require('express').Router();
const Meal = require('./controllers/meal');
const UserProfile = require('./controllers/userProfile');

// Meal endpoints
router.get('/meals', Meal.getAll);
router.post('/meals', Meal.addOne);
router.delete('/meals/:id', Meal.deleteOne);

// Profile data endpoints
router.get('/profiles', UserProfile.getAll);
router.get('/profiles/:id', UserProfile.getById);
router.post('/profiles', UserProfile.addOne);
router.patch('/profiles/:id', UserProfile.updateOne);

module.exports = router;
