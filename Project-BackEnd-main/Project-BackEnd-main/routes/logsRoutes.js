const express = require("express");
const router = express.Router();
const logsController = require("../controllers/logsController");

// Route to create a new log
// POST /api/logs/
// Creates a new log in the database
router.post("/", logsController.createLog);

// Route to get all logs
// GET /api/logs/
// Retrieves all logs from the database
router.get("/", logsController.getLogs);

// Route to get a log by ID
// GET /api/logs/:id
// Retrieves a single log by its ID
router.get("/:id", logsController.getLogById);

// Route to update a log by ID
// PUT /api/logs/:id
// Updates a log with the provided ID
router.put("/:id", logsController.updateLog);

// Route to delete a log by ID
// DELETE /api/logs/:id
// Deletes a log with the provided ID
router.delete("/:id", logsController.deleteLog);

// Route to get logs by date range
// GET /api/logs/date-range?userId=<user_id>&startDate=<start>&endDate=<end>
// Retrieves logs between a start date and an end date for a specific user
router.get("/date-range", logsController.getLogsByDateRange);

// Route to get logs by type
// GET /api/logs/type/:logType?userId=<user_id>
// Retrieves logs of a specified type (e.g., 'Calories intake', 'Sleep', 'Water', etc.)
router.get("/type/:logType", logsController.getLogsByType);

// Route to get logs by both date range and type
// GET /api/logs/date-range/type/:logType?userId=<user_id>&startDate=<start>&endDate=<end>
// Retrieves logs of a specific type within a given date range for a specific user
router.get(
	"/date-range/type/:logType",
	logsController.getLogsByDateRangeAndType
);

module.exports = router;
