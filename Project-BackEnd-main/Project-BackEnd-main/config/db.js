const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB Atlas using Mongoose
const connectDB = async () => {
	try {
		// Connect to MongoDB using Mongoose (no need for deprecated options)
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected successfully...");
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1); // Exit the process if connection fails
	}
};

module.exports = connectDB;
