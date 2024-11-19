const mongoose = require("mongoose");

// Define the schema for the Workouts collection
const workoutsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users", // Reference to the user who created the workout
		required: true,
	},
	workoutName: {
		type: String,
		required: true, // Name of the workout (e.g., "Morning Run", "Leg Day")
	},
	workoutType: {
		type: String,
		required: true, // Type of the workout (e.g., "Cardio", "Strength")
	},
	workoutDescription: {
		type: String, // Detailed description of the workout
		required: true,
	},
	howItWorks: {
		type: String, // Explanation of how the workout should be done
		required: true,
	},
	primaryMuscles: {
		type: [String], // Array of primary muscles targeted by the workout
		required: true,
	},
	secondaryMuscles: {
		type: [String], // Array of secondary muscles involved in the workout
	},
	setsOrDuration: {
		type: Boolean, // Boolean to indicate if the workout is based on sets (true) or duration (false)
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now, // Timestamp when the workout was created
	},
	updatedAt: {
		type: Date,
		default: Date.now, // Timestamp when the workout was last updated
	},
});

// Export the Workouts model
module.exports = mongoose.model("Workouts", workoutsSchema);
