const WorkoutLogs = require("../models/workoutslogsModel");
const Users = require("../models/usersModel"); // Import Users model to check for user existence

// Create a new workout log
// This function creates a new workout log entry based on the request body.
// It checks if the user exists before proceeding with workout log creation.
exports.createWorkoutLog = async (req, res) => {
	try {
		// Check if the user exists
		const user = await Users.findById(req.body.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Proceed with creating workout log
		const workoutLog = new WorkoutLogs(req.body); // Create a new workout log instance with data from request body
		const savedWorkoutLog = await workoutLog.save(); // Save the workout log to the database
		res.status(201).json(savedWorkoutLog); // Return the saved workout log in the response
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get all workout logs
// This function retrieves all workout logs stored in the database for a given user.
// It checks if the user exists before proceeding with the query.
exports.getWorkoutLogs = async (req, res) => {
	try {
		const { userId } = req.query; // Get userId from the query parameters

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Retrieve all workout logs for the user
		const workoutLogs = await WorkoutLogs.find({ userId: userId }).populate(
			"userId workoutId"
		);
		if (workoutLogs.length === 0) {
			return res
				.status(404)
				.json({ message: "No workout logs found for this user." });
		}
		res.status(200).json(workoutLogs); // Return the retrieved workout logs
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get a workout log by ID
// This function retrieves a single workout log by its unique ID.
// It checks if the log exists and then returns it.
exports.getWorkoutLogById = async (req, res) => {
	try {
		const workoutLog = await WorkoutLogs.findById(req.params.id).populate(
			"userId workoutId"
		);
		if (!workoutLog)
			return res.status(404).json({ message: "Workout log not found" }); // Return 404 if workout log doesn't exist
		res.status(200).json(workoutLog); // Return the found workout log
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Update a workout log by ID
// This function updates a workout log by its unique ID with the provided data in the request body.
exports.updateWorkoutLog = async (req, res) => {
	try {
		const updatedWorkoutLog = await WorkoutLogs.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true, // Return the updated document
			}
		);
		if (!updatedWorkoutLog)
			return res.status(404).json({ message: "Workout log not found" }); // Return 404 if workout log doesn't exist
		res.status(200).json(updatedWorkoutLog); // Return the updated workout log
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Delete a workout log by ID
// This function deletes a workout log by its unique ID.
exports.deleteWorkoutLog = async (req, res) => {
	try {
		const deletedWorkoutLog = await WorkoutLogs.findByIdAndDelete(
			req.params.id
		); // Find and delete the workout log by its ID
		if (!deletedWorkoutLog)
			return res.status(404).json({ message: "Workout log not found" }); // Return 404 if workout log doesn't exist
		res.status(200).json({ message: "Workout log deleted successfully" }); // Return success message
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get workout logs by date range
// This function retrieves workout logs within a specified date range.
exports.getWorkoutLogsByDateRange = async (req, res) => {
	try {
		const { userId, startDate, endDate } = req.query;

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const start = new Date(startDate); // Convert startDate to Date object
		const end = new Date(endDate); // Convert endDate to Date object

		// Query workout logs by userId and date range
		const workoutLogs = await WorkoutLogs.find({
			userId: userId,
			logDate: {
				$gte: start, // Greater than or equal to start date
				$lte: end, // Less than or equal to end date
			},
		});

		if (workoutLogs.length === 0) {
			return res
				.status(404)
				.json({
					message: "No workout logs found within the specified date range.",
				});
		}

		res.status(200).json(workoutLogs); // Return the workout logs found within the date range
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving workout logs by date range", error });
	}
};
