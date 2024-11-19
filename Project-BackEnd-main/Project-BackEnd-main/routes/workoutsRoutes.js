const express = require("express");
const router = express.Router();
const workoutsController = require("../controllers/workoutsController");

// Route to create a new workout
router.post("/", workoutsController.createWorkout);

// Route to get all workouts
router.get("/", workoutsController.getWorkouts);

// Route to get a workout by ID
router.get("/:id", workoutsController.getWorkoutById);

// Route to update a workout by ID
router.put("/:id", workoutsController.updateWorkout);

// Route to delete a workout by ID
router.delete("/:id", workoutsController.deleteWorkout);

module.exports = router;
