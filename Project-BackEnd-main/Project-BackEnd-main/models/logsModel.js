const mongoose = require("mongoose");

// Define valid log types (single-word convention)
const validLogTypes = ["sleep", "water", "steps", "weight", "burn", "intake"];

// Define the schema for the Logs collection
const logsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	logType: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				// Check if the logType is in the list of valid types
				return validLogTypes.includes(value);
			},
			message: (props) =>
				`${
					props.value
				} is not a valid log type. Valid types are: ${validLogTypes.join(
					", "
				)}`,
		},
	},
	logDate: { type: Date, default: Date.now },
	valueLogged: { type: Number, required: true },
	metric: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Export the Logs model
module.exports = mongoose.model("Logs", logsSchema);
