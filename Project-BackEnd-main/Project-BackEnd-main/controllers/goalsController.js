const Goals = require("../models/goalsModel");
const Users = require("../models/usersModel"); // Import Users model to check for user existence

// Create a new goal
// This function creates a new goal entry for the user if the user exists.
exports.createGoal = async (req, res) => {
	try {
		// Check if the user exists
		const user = await Users.findById(req.body.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Proceed with creating the goal
		const goal = new Goals(req.body);
		const savedGoal = await goal.save();
		res.status(201).json(savedGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get all goals
// This function retrieves all goals for a given user if the user exists.
exports.getGoals = async (req, res) => {
	try {
		const { userId } = req.query;

		// Check if the user exists
		const user = await Users.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Retrieve all goals for the user
		const goals = await Goals.find({ userId: userId });
		if (goals.length === 0) {
			return res.status(404).json({ message: "No goals found for this user." });
		}
		res.status(200).json(goals);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get goal by ID
// This function retrieves a single goal by its unique ID.
exports.getGoalById = async (req, res) => {
	try {
		const goal = await Goals.findById(req.params.id);
		if (!goal) return res.status(404).json({ message: "Goal not found" });
		res.status(200).json(goal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update goal by ID
// This function updates a goal by its unique ID with the provided data in the request body.
exports.updateGoal = async (req, res) => {
	try {
		const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedGoal)
			return res.status(404).json({ message: "Goal not found" });
		res.status(200).json(updatedGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete goal by ID
// This function deletes a goal by its unique ID.
exports.deleteGoal = async (req, res) => {
	try {
		const deletedGoal = await Goals.findByIdAndDelete(req.params.id);
		if (!deletedGoal)
			return res.status(404).json({ message: "Goal not found" });
		res.status(200).json({ message: "Goal deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
