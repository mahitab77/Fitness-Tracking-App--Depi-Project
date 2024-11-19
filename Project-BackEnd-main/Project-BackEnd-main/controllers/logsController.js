const Logs = require("../models/logsModel");
const Users = require("../models/usersModel"); // Import Users model for checking user existence

// Create a new log
// This function creates a new log entry based on the request body.
// It also checks if the user exists before proceeding with log creation.
exports.createLog = async (req, res) => {
	try {
		// Check if the user exists
		const user = await Users.findById(req.body.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Proceed with log creation
		const log = new Logs(req.body); // Create a new log instance with data from request body
		const savedLog = await log.save(); // Save the log to the database
		res.status(201).json(savedLog); // Return the saved log in the response
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get all logs
// This function retrieves all logs stored in the database for a given user.
// It also checks if the user exists before proceeding with the query.
exports.getLogs = async (req, res) => {
	try {
		const { userId } = req.query; // Get userId from the query parameters

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Proceed with retrieving logs
		const logs = await Logs.find({ userId: userId }).populate("userId"); // Retrieve all logs for the user and populate userId field
		if (logs.length === 0) {
			return res.status(404).json({ message: "No logs found for this user." });
		}
		res.status(200).json(logs); // Return the retrieved logs
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get log by ID
// This function retrieves a single log by its unique ID.
// It first checks if the log exists.
exports.getLogById = async (req, res) => {
	try {
		const log = await Logs.findById(req.params.id).populate("userId"); // Find the log by its ID and populate userId field
		if (!log) return res.status(404).json({ message: "Log not found" }); // Return 404 if log doesn't exist
		res.status(200).json(log); // Return the found log
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Update log by ID
// This function updates a log by its unique ID with the provided data in the request body.
exports.updateLog = async (req, res) => {
	try {
		const updatedLog = await Logs.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Return the updated document
		});
		if (!updatedLog) return res.status(404).json({ message: "Log not found" }); // Return 404 if log doesn't exist
		res.status(200).json(updatedLog); // Return the updated log
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Delete log by ID
// This function deletes a log by its unique ID.
exports.deleteLog = async (req, res) => {
	try {
		const deletedLog = await Logs.findByIdAndDelete(req.params.id); // Find and delete the log by its ID
		if (!deletedLog) return res.status(404).json({ message: "Log not found" }); // Return 404 if log doesn't exist
		res.status(200).json({ message: "Log deleted successfully" }); // Return success message
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get logs by date range
// This function retrieves logs by a date range provided in the request query.
exports.getLogsByDateRange = async (req, res) => {
	try {
		const { userId, startDate, endDate } = req.query;

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Convert startDate and endDate to Date objects for querying
		const start = new Date(startDate);
		const end = new Date(endDate);

		// Query logs by userId and date range
		const logs = await Logs.find({
			userId: userId,
			logDate: {
				$gte: start,
				$lte: end,
			},
		});

		if (logs.length === 0) {
			return res
				.status(404)
				.json({ message: "No logs found within the specified date range." });
		}

		res.status(200).json(logs);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving logs by date range", error });
	}
};

// Get logs by type
// This function retrieves logs by their type, such as 'Calories intake', 'Sleep', 'Water', etc.
exports.getLogsByType = async (req, res) => {
	try {
		const { userId } = req.query; // Keep userId as a query parameter
		const { logType } = req.params; // Retrieve logType from URL parameters

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Find logs based on the logType and userId
		const logs = await Logs.find({ userId, logType });

		if (logs.length === 0) {
			return res
				.status(204)
				.json({ message: `No logs found for log type: ${logType}` });
		}

		res.status(200).json(logs);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving logs by type", error });
	}
};

// Get logs by both date range and type
// This function retrieves logs by a combination of date range and type.
exports.getLogsByDateRangeAndType = async (req, res) => {
	try {
		const { userId, startDate, endDate } = req.query; // Keep userId and date range as query parameters
		const { logType } = req.params; // Retrieve logType from URL parameters

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Convert startDate and endDate to Date objects
		const start = new Date(startDate);
		const end = new Date(endDate);

		// Query logs by userId, logType, and date range
		const logs = await Logs.find({
			userId: userId,
			logType: logType,
			logDate: { $gte: start, $lte: end },
		});

		if (logs.length === 0) {
			return res.status(404).json({
				message: `No logs found for log type: ${logType} within the date range.`,
			});
		}

		res.status(200).json(logs);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving logs by date range and type", error });
	}
};
