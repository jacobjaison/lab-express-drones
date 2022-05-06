const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    const drones = await Drone.find();
    res.render('drones/list', {drones});
  } catch (error) {
    next(error);
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  try {
    const {name,propellers,maxSpeed} = req.body;

    await Drone.create({
      name,
      propellers,
      maxSpeed
    })
    res.redirect("/drones");
  } catch (error) {
    next(error);
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  try {
    const {id} = req.params;
    const drone = await Drone.findById(id);

    res.render('drones/update-form', drone);
  } catch (error) {
      next(error);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {id} = req.params;
    const {name,propellers,maxSpeed} = req.body;
    console.log('id:'+id);
    await Drone.findByIdAndUpdate(id, {name,propellers,maxSpeed}, {new:true});

    res.redirect("/drones");
  } catch (error) {
    console.log(error);
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here

  try {
    const {id} = req.params;

    await Drone.findByIdAndDelete(id);
    res.redirect('/drones');

  } catch (error) {
      next (error);
  }
});

module.exports = router;
