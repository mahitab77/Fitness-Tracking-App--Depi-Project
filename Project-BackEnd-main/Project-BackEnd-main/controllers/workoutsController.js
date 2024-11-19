const Workouts = require("../models/workoutsModel");
const Users = require("../models/usersModel"); // Import Users model to check for user existence

// Create a new workout
// This function creates a new workout entry for the provided user if the user exists.
exports.createWorkout = async (req, res) => {
	try {
		// Check if the user exists
		const user = await Users.findById(req.body.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Proceed with creating the workout
		const workout = new Workouts(req.body); // Create a new workout instance with data from request body
		const savedWorkout = await workout.save(); // Save the workout to the database
		res.status(201).json(savedWorkout); // Return the saved workout in the response
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get all workouts
// This function retrieves all workouts for a given user if the user exists.
exports.getWorkouts = async (req, res) => {
	try {
		const { userId } = req.query; // Get userId from the query parameters

		if (userId) {
			// Check if the user exists
			const user = await Users.findById(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Retrieve all workouts for the user
			const workouts = await Workouts.find({ userId: userId }).populate(
				"userId"
			);
			if (workouts.length === 0) {
				return res
					.status(204)
					.json({ message: "No workouts found for this user." });
			}
			res.status(200).json(workouts); // Return the retrieved workouts
		} else {
			// Retrieve all workouts
			const workouts = await Workouts.find();
			if (workouts.length === 0) {
				return res.status(204).json({ message: "No workouts found." });
			}
			res.status(200).json(workouts); // Return the retrieved workouts
		}
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Get workout by ID
// This function retrieves a single workout by its unique ID.
exports.getWorkoutById = async (req, res) => {
	try {
		const workout = await Workouts.findById(req.params.id).populate("userId");
		if (!workout) return res.status(404).json({ message: "Workout not found" }); // Return 404 if workout doesn't exist
		res.status(200).json(workout); // Return the found workout
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Update workout by ID
// This function updates a workout by its unique ID with the provided data in the request body.
exports.updateWorkout = async (req, res) => {
	try {
		const updatedWorkout = await Workouts.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true, // Return the updated document
			}
		);
		if (!updatedWorkout)
			return res.status(404).json({ message: "Workout not found" }); // Return 404 if workout doesn't exist
		res.status(200).json(updatedWorkout); // Return the updated workout
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};

// Delete workout by ID
// This function deletes a workout by its unique ID.
exports.deleteWorkout = async (req, res) => {
	try {
		const deletedWorkout = await Workouts.findByIdAndDelete(req.params.id); // Find and delete the workout by its ID
		if (!deletedWorkout)
			return res.status(404).json({ message: "Workout not found" }); // Return 404 if workout doesn't exist
		res.status(200).json({ message: "Workout deleted successfully" }); // Return success message
	} catch (error) {
		res.status(500).json({ message: error.message }); // Return error message in case of failure
	}
};
