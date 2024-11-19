const mongoose = require("mongoose");

const validGoalsTypes = [
	"sleep",
	"water",
	"steps",
	"weight",
	"burn",
	"intake",
	"workout",
];

// Define the schema for the Goals collection
const goalsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	}, // Reference to the user who set the goal
	goalType: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				// Check if the logType is in the list of valid types
				return validGoalsTypes.includes(value);
			},
			message: (props) =>
				`${
					props.value
				} is not a valid goal type. Valid types are: ${validGoalsTypes.join(
					", "
				)}`,
		},
	}, // Type of goal (weight loss, step count, etc.)
	currentValue: {
		type: Number,
		required: false,
	}, // The current value toward the goal (e.g., current weight, current steps)
	targetValue: {
		type: Number,
	}, // The target value for the goal (e.g., target weight, target steps)
	startDate: {
		type: Date,
		default: Date.now,
	}, // Start date of the goal
	endDate: {
		type: Date,
	}, // End date of the goal
	isCompleted: {
		type: Boolean,
		default: false,
	}, // Whether the goal is completed or not
	quantity: {
		type: Number,
		// Custom validation logic: require quantity for all log types except "workout" and "weight"
		validate: {
			validator: function (value) {
				// If goalType is "workout" or "weight", quantity can be optional
				if (this.goalType === "workout" || this.goalType === "weight") {
					return true;
				}
				// For all other goal types, quantity must be provided
				return value != null;
			},
			message:
				"Quantity is required for goal types other than workout and weight.",
		},
	}, // Quantity for the goal (e.g., steps per day)
	interval: {
		type: String,
	}, // Time interval for the goal (e.g., daily, weekly)
	duration: {
		type: Number,
	}, // Duration of the goal in days (optional)
	createdAt: {
		type: Date,
		default: Date.now,
	}, // Timestamp when the goal is created
	updatedAt: {
		type: Date,
		default: Date.now,
	}, // Timestamp when the goal is last updated
});

// Export the Goals model
module.exports = mongoose.model("Goals", goalsSchema);
