const express = require("express");
const router = express.Router();
const {
	createWorkoutLog,
	getWorkoutLogs,
	getWorkoutLogById,
	updateWorkoutLog,
	deleteWorkoutLog,
	getWorkoutLogsByDateRange,
} = require("../controllers/workoutslogsController");

// Route to create a new workout log
router.post("/", createWorkoutLog);

// Route to get all workout logs
router.get("/", getWorkoutLogs);

// Route to get workout logs by date range (should be before `/:id`)
router.get("/date-range", getWorkoutLogsByDateRange);

// Route to get a workout log by ID
router.get("/:id", getWorkoutLogById);

// Route to update a workout log by ID
router.put("/:id", updateWorkoutLog);

// Route to delete a workout log by ID
router.delete("/:id", deleteWorkoutLog);

module.exports = router;
