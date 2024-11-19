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
	  setsOrDuration: true,  // Indicating it's based on duration
	  primaryMuscles: ["Legs", "Glutes"],
	  secondaryMuscles: ["Core"],
	},
	{
	  workoutName: "Evening Yoga",
	  workoutType: "Flexibility",
	  workoutDescription: "Evening yoga session for relaxation.",
	  howItWorks: "Perform slow and controlled yoga poses with deep breathing.",
	  setsOrDuration: true,  // Indicating it's based on duration
	  primaryMuscles: ["Core", "Lower Back"],
	  secondaryMuscles: ["Arms"],
	},
	{
	  workoutName: "HIIT Session",
	  workoutType: "Strength",
	  workoutDescription: "High Intensity Interval Training",
	  howItWorks: "Alternate between high-intensity exercises and short rest periods.",
	  setsOrDuration: true,  // Indicating it's based on sets or reps
	  primaryMuscles: ["Legs", "Chest"],
	  secondaryMuscles: ["Core", "Arms"],
	},
	{
	  workoutName: "Swimming",
	  workoutType: "Endurance",
	  workoutDescription: "Swimming at the local pool",
	  howItWorks: "Perform laps, alternating between freestyle and breaststroke.",
	  setsOrDuration: true,  // Based on duration
	  primaryMuscles: ["Back", "Shoulders"],
	  secondaryMuscles: ["Legs"],
	},
	{
	  workoutName: "Cycling",
	  workoutType: "Cardio",
	  workoutDescription: "Cycling in the park",
	  howItWorks: "Start with a moderate pace, increase speed intermittently.",
	  setsOrDuration: true,  // Based on duration
	  primaryMuscles: ["Legs"],
	  secondaryMuscles: ["Glutes", "Core"],
	},
	{
	  workoutName: "Pilates",
	  workoutType: "Flexibility",
	  workoutDescription: "Pilates session",
	  howItWorks: "Perform controlled Pilates movements targeting core stability.",
	  setsOrDuration: true,  // Based on duration
	  primaryMuscles: ["Core"],
	  secondaryMuscles: ["Legs", "Lower Back"],
	}
  ];
  


const logsData = [
  { logType: "sleep", logDate: new Date(), valueLogged: 7.5, metric: "hours" },
  { logType: "water", logDate: new Date(), valueLogged: 2.5, metric: "liters" },
  { logType: "steps", logDate: new Date(), valueLogged: 10000, metric: "steps" },
  { logType: "weight", logDate: new Date(), valueLogged: 70, metric: "kg" },
  { logType: "sleep", logDate: new Date(), valueLogged: 6.8, metric: "hours" },
  { logType: "water", logDate: new Date(), valueLogged: 3.0, metric: "liters" },
  { logType: "burn", logDate: new Date(), valueLogged: 350, metric: "calories" },
  { logType: "intake", logDate: new Date(), valueLogged: 2500, metric: "calories" },
  { logType: "intake", logDate: new Date(), valueLogged: 1800, metric: "calories" },
  { logType: "sleep", logDate: new Date(), valueLogged: 7.5, metric: "hours" },
  { logType: "water", logDate: new Date(), valueLogged: 2.5, metric: "liters" },
  { logType: "steps", logDate: new Date(), valueLogged: 9000, metric: "steps" },
  { logType: "weight", logDate: new Date(), valueLogged: 89, metric: "kg" },
  { logType: "sleep", logDate: new Date(), valueLogged: 9, metric: "hours" },
  { logType: "water", logDate: new Date(), valueLogged: 2.0, metric: "liters" },
  { logType: "burn", logDate: new Date(), valueLogged: 250, metric: "calories" },
  { logType: "intake", logDate: new Date(), valueLogged: 2000, metric: "calories" },
  { logType: "intake", logDate: new Date(), valueLogged: 1400, metric: "calories" }
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
		targetValue: 5,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "steps",
		currentValue: 9000,
		targetValue: 10000,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "weight",
		currentValue: 78,
		targetValue: 75,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
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
		currentValue: 1.8,
		targetValue: 3.5,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "intake",
		currentValue: 2000,
		targetValue: 1500,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "workout",
		currentValue: 4,
		targetValue: 5,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "steps",
		currentValue: 9000,
		targetValue: 12000,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
	{
		goalType: "weight",
		currentValue: 86,
		targetValue: 75,
		startDate: new Date(),
		endDate: new Date(),
		isCompleted: false,
	},
];

const seedDatabase = async () => {
	try {
		await clearDatabase();
		console.log("Database cleared.");

		const users = await Users.insertMany(usersData);
		console.log("Users collection seeded!");
		const userIds = users.map((user) => user._id);

		workoutsData.forEach((workout, index) => {
			workout.userId = userIds[index % userIds.length];
		});
		const workouts = await Workouts.insertMany(workoutsData);
		console.log("Workouts collection seeded!");
		const workoutIds = workouts.map((workout) => workout._id);

		logsData.forEach((log, index) => {
			log.userId = userIds[index % userIds.length];
		});
		const logs = await Logs.insertMany(logsData);
		console.log("Logs collection seeded!");

		const workoutLogsData = [
			{
				userId: userIds[0],
				workoutId: workoutIds[0],
				logDate: new Date(),
				logStartTime: "07:00 AM",
				duration: 30,
				caloriesBurned: 200,
				setDetails: [{ setNo: 1, reps: 15, intensity: "medium" }],
			},
			{
				userId: userIds[1],
				workoutId: workoutIds[1],
				logDate: new Date(),
				logStartTime: "06:30 AM",
				duration: 45,
				caloriesBurned: 300,
				setDetails: [{ setNo: 1, reps: 10, intensity: "high" }],
			},
			{
				userId: userIds[2],
				workoutId: workoutIds[2],
				logDate: new Date(),
				logStartTime: "08:00 AM",
				duration: 40,
				caloriesBurned: 250,
				setDetails: [{ setNo: 1, reps: 12, intensity: "low" }],
			},
			{
				userId: userIds[3],
				workoutId: workoutIds[3],
				logDate: new Date(),
				logStartTime: "05:30 PM",
				duration: 60,
				caloriesBurned: 500,
				setDetails: [{ setNo: 1, reps: 20, intensity: "medium" }],
			},
			{
				userId: userIds[4],
				workoutId: workoutIds[4],
				logDate: new Date(),
				logStartTime: "07:45 AM",
				duration: 50,
				caloriesBurned: 350,
				setDetails: [{ setNo: 1, reps: 15, intensity: "high" }],
			},
			{
				userId: userIds[5],
				workoutId: workoutIds[5],
				logDate: new Date(),
				logStartTime: "06:00 PM",
				duration: 30,
				caloriesBurned: 180,
				setDetails: [{ setNo: 1, reps: 10, intensity: "medium" }],
			},
		];

		await WorkoutLogs.insertMany(workoutLogsData);
		console.log("WorkoutLogs collection seeded!");

		goalsData.forEach((goal, index) => {
			goal.userId = userIds[index % userIds.length];
		});
		await Goals.insertMany(goalsData);
		console.log("Goals collection seeded!");

		mongoose.connection.close();
	} catch (error) {
		console.error("Error seeding the database:", error);
		mongoose.connection.close();
	}
};

seedDatabase();
