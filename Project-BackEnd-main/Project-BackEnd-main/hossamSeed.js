const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Import models
const Users = require("./models/usersModel");
const Logs = require("./models/logsModel");
const Goals = require("./models/goalsModel");
const WorkoutLogs = require("./models/workoutslogsModel");
const Workouts = require("./models/workoutsModel");

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB...");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err.message);
	});

// Function to clear existing data in collections
const clearDatabase = async () => {
	await Users.deleteMany({});
	await Logs.deleteMany({});
	await Goals.deleteMany({});
	await WorkoutLogs.deleteMany({});
	await Workouts.deleteMany({});
};

// Sample data for seeding
const usersData = [
	{
		name: "Mohamed Ali",
		userName: "mohamed_ali",
		email: "mohamed11@example.com",
		password: "password123",
		role: "client",
		dateOfBirth: "1985-01-01",
		gender: "male",
	},
	{
		name: "Fatma Alzahra",
		userName: "fatma_az",
		email: "fatma22@example.com",
		password: "password123",
		role: "trainer",
		dateOfBirth: "1990-05-05",
		gender: "female",
	},
	{
		name: "Alia Saeed",
		userName: "alia_saeed",
		email: "alia33@example.com",
		password: "password123",
		role: "client",
		dateOfBirth: "1995-07-07",
		gender: "female",
	},
	{
		name: "Ahmed Hassan",
		userName: "ahmed_hassan",
		email: "ahmed44@example.com",
		password: "password123",
		role: "admin",
		dateOfBirth: "1975-02-20",
		gender: "male",
	},
	{
		name: "Omar Khaled",
		userName: "omar_khaled",
		email: "omar55@example.com",
		password: "password123",
		role: "client",
		dateOfBirth: "1988-12-12",
		gender: "male",
	},
	{
		name: "Layla Noor",
		userName: "layla_noor",
		email: "layla66@example.com",
		password: "password123",
		role: "client",
		dateOfBirth: "1992-03-15",
		gender: "female",
	},
];

const workoutsData = [
	{
		workoutName: "Morning Run",
		workoutType: "Cardio",
		workoutDescription: "Run around the park",
		howItWorks: "Start with a light jog, then increase speed gradually.",
		setsOrDuration: true, // Indicating it's based on duration
		primaryMuscles: ["Legs", "Glutes"],
		secondaryMuscles: ["Core"],
	},
	{
		workoutName: "Evening Yoga",
		workoutType: "Flexibility",
		workoutDescription: "Evening yoga session for relaxation.",
		howItWorks: "Perform slow and controlled yoga poses with deep breathing.",
		setsOrDuration: true, // Indicating it's based on duration
		primaryMuscles: ["Core", "Lower Back"],
		secondaryMuscles: ["Arms"],
	},
	{
		workoutName: "HIIT Session",
		workoutType: "Strength",
		workoutDescription: "High Intensity Interval Training",
		howItWorks:
			"Alternate between high-intensity exercises and short rest periods.",
		setsOrDuration: true, // Indicating it's based on sets or reps
		primaryMuscles: ["Legs", "Chest"],
		secondaryMuscles: ["Core", "Arms"],
	},
	{
		workoutName: "Swimming",
		workoutType: "Endurance",
		workoutDescription: "Swimming at the local pool",
		howItWorks: "Perform laps, alternating between freestyle and breaststroke.",
		setsOrDuration: true, // Based on duration
		primaryMuscles: ["Back", "Shoulders"],
		secondaryMuscles: ["Legs"],
	},
	{
		workoutName: "Cycling",
		workoutType: "Cardio",
		workoutDescription: "Cycling in the park",
		howItWorks: "Start with a moderate pace, increase speed intermittently.",
		setsOrDuration: true, // Based on duration
		primaryMuscles: ["Legs"],
		secondaryMuscles: ["Glutes", "Core"],
	},
	{
		workoutName: "Pilates",
		workoutType: "Flexibility",
		workoutDescription: "Pilates session",
		howItWorks:
			"Perform controlled Pilates movements targeting core stability.",
		setsOrDuration: true, // Based on duration
		primaryMuscles: ["Core"],
		secondaryMuscles: ["Legs", "Lower Back"],
	},
];

const workoutLogsData = [
	{
		logDate: new Date(),
		logStartTime: "07:00 AM",
		duration: 30,
		caloriesBurned: 200,
		setDetails: [{ setNo: 1, reps: 15, intensity: "medium" }],
	},
	{
		logDate: new Date(),
		logStartTime: "06:30 AM",
		duration: 45,
		caloriesBurned: 300,
		setDetails: [{ setNo: 1, reps: 10, intensity: "high" }],
	},
	{
		logDate: new Date(),
		logStartTime: "08:00 AM",
		duration: 40,
		caloriesBurned: 250,
		setDetails: [{ setNo: 1, reps: 12, intensity: "low" }],
	},
	{
		logDate: new Date(),
		logStartTime: "05:30 PM",
		duration: 60,
		caloriesBurned: 500,
		setDetails: [{ setNo: 1, reps: 20, intensity: "medium" }],
	},
	{
		logDate: new Date(),
		logStartTime: "07:45 AM",
		duration: 50,
		caloriesBurned: 350,
		setDetails: [{ setNo: 1, reps: 15, intensity: "high" }],
	},
	{
		logDate: new Date(),
		logStartTime: "06:00 PM",
		duration: 30,
		caloriesBurned: 180,
		setDetails: [{ setNo: 1, reps: 10, intensity: "medium" }],
	},
];

// Function to generate random dates between two dates
const getRandomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

// Define start and end dates for logs
const startDate = new Date("2024-01-01");
const endDate = new Date(); // Current date

// Modify logsData to assign all logs to one user and distribute dates across the range
const logsData = [
	{
		logType: "sleep",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 7.5,
		metric: "hours",
	},
	{
		logType: "water",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 2.5,
		metric: "liters",
	},
	{
		logType: "steps",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 10000,
		metric: "steps",
	},
	{
		logType: "weight",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 70,
		metric: "kg",
	},
	{
		logType: "sleep",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 6.8,
		metric: "hours",
	},
	{
		logType: "water",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 3.0,
		metric: "liters",
	},
	{
		logType: "burn",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 350,
		metric: "calories",
	},
	{
		logType: "intake",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 2500,
		metric: "calories",
	},
	{
		logType: "intake",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 1800,
		metric: "calories",
	},
	{
		logType: "sleep",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 7.5,
		metric: "hours",
	},
	{
		logType: "water",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 2.5,
		metric: "liters",
	},
	{
		logType: "steps",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 9000,
		metric: "steps",
	},
	{
		logType: "weight",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 89,
		metric: "kg",
	},
	{
		logType: "sleep",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 9,
		metric: "hours",
	},
	{
		logType: "water",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 2.0,
		metric: "liters",
	},
	{
		logType: "burn",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 250,
		metric: "calories",
	},
	{
		logType: "intake",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 2000,
		metric: "calories",
	},
	{
		logType: "intake",
		logDate: getRandomDate(startDate, endDate),
		valueLogged: 1400,
		metric: "calories",
	},
];

const goalsData = [
	{
		goalType: "sleep",
		currentValue: 6,
		targetValue: 8,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "water",
		currentValue: 1.5,
		targetValue: 3,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "burn",
		currentValue: 200,
		targetValue: 800,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "workout",
		currentValue: 4,
		targetValue: 7,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
];

// Seeding function
const seedDatabase = async () => {
	try {
		await clearDatabase();
		console.log("Database cleared.");

		// Insert users
		const users = await Users.insertMany(usersData);
		console.log("Users collection seeded!");
		const userIds = users.map((user) => user._id);

		// Insert logs
		const updatedLogsData = logsData.map((log) => ({
			...log,
			userId: userIds[0],
		}));
		await Logs.insertMany(updatedLogsData);
		console.log("Logs collection seeded!");

		// Insert workouts
		const updatedWorkoutsData = workoutsData.map((workout) => ({
			...workout,
			userId: userIds[0],
		}));
		const workouts = await Workouts.insertMany(updatedWorkoutsData);
		console.log("Workouts collection seeded!");
		const workoutIds = workouts.map((workout) => workout._id);

		// Insert goals
		const updatedGoalsData = goalsData.map((goal) => ({
			...goal,
			userId: userIds[0],
		}));
		await Goals.insertMany(updatedGoalsData);
		console.log("Goals collection seeded!");

		// Insert workout logs
		const updatedWorkoutLogsData = workoutLogsData.map((workoutLog) => ({
			...workoutLog,
			userId: userIds[0],
			workoutId: workoutIds[0], // Assuming you're assigning the first workout to all logs
		}));
		await WorkoutLogs.insertMany(updatedWorkoutLogsData);
		console.log("WorkoutLogs collection seeded!");

		mongoose.connection.close();
	} catch (error) {
		console.error("Error seeding the database:", error);
		mongoose.connection.close();
	}
};

seedDatabase();
