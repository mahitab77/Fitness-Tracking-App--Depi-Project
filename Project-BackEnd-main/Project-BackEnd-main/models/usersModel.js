const mongoose = require("mongoose");

// Define the schema for the Users collection
const usersSchema = new mongoose.Schema({
	name: { type: String, required: true }, // Real name of the user
	email: { type: String, required: true, unique: true }, // Email of the user, unique across the database
	password: { type: String, required: true }, // User password
	avatar: { type: String }, // Avatar or profile picture
	dateOfBirth: { type: Date }, // Date of birth
	gender: { type: String }, // Gender of the user (optional)
	role: { type: String, required: true, default: "client" }, // User role (e.g., admin, trainer, client), default is 'user'
	refreshToken: { type: String },
	createdAt: { type: Date, default: Date.now }, // Timestamp when the user is created
	updatedAt: { type: Date, default: Date.now }, // Timestamp when the user is last updated
});

// Export the Users model to be used in the application
module.exports = mongoose.model("Users", usersSchema);
