const mongoose = require("mongoose");

// Define the schema for the workoutslogs collection
const workoutslogsSchema = new mongoose.Schema({
	//logId: { type: mongoose.Schema.Types.ObjectId, ref: 'Logs', required: true },  // General log reference
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	}, // Reference to the user who performed the workout
	workoutId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Workouts",
		required: true,
	}, // Reference to the workout performed
	logDate: { type: Date, default: Date.now }, // Date when the workout was logged
	logStartTime: { type: String }, // Start time of the workout
	duration: { type: Number, required: true }, // Duration of the workout in minutes
	caloriesBurned: { type: Number }, // Calories burned during the workout
	logEndTime: { type: String }, // End time of the workout
	durationIntensity: { type: String }, // Intensity level of the workout
	setDetails: [
		{
			setNo: { type: Number, required: true }, // Set number
			reps: { type: Number, required: true }, // Number of reps in this set
			intensity: { type: String }, // Intensity of the set (optional)
		},
	], // Array of sets for the workout
	createdAt: { type: Date, default: Date.now }, // Timestamp when the workout log is created
	updatedAt: { type: Date, default: Date.now }, // Timestamp when the workout log is last updated
});

// Export the workoutslogs model
module.exports = mongoose.model("workoutslogs", workoutslogsSchema);
