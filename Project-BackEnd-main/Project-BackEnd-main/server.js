const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"https://project-back-end-delta.vercel.app",
		"https://fitness-hmfn.vercel.app",
	], // Replace with your frontend URLs
	credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
	res.send("Welcome to the Fitness Tracker API!");
});

// Import and use routes
app.use("/api/auth", require("./routes/authRoutes"));

// middleware to check if authanticated
// app.use(verifyJWT);

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/logs", require("./routes/logsRoutes"));
app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/workoutslogs", require("./routes/workoutslogsRoutes"));
app.use("/api/workouts", require("./routes/workoutsRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
