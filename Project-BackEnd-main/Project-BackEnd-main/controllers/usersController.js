const Users = require("../models/usersModel"),
	multer = require("multer"),
	path = require("path");

// Create a new user
exports.createUser = async (req, res) => {
	try {
		const user = new Users(req.body);
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get all users
exports.getUsers = async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user by ID
exports.getUserById = async (req, res) => {
	try {
		const user = await Users.findById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user by refresh token
exports.getUserByRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	try {
		const foundUser = await Users.findOne({ refreshToken: refreshToken });
		if (!foundUser) return res.status(404).json({ message: "User not found" });

		console.log("foundUser", foundUser);

		const user = {
			name: foundUser.name,
			email: foundUser.email,
			role: foundUser.role,
			avatar: foundUser.avatar || null,
			dateOfBirth: foundUser.dateOfBirth || null,
			gender: foundUser.gender || null,
			id: foundUser._id,
		};
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update user by ID
exports.updateUser = async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
	try {
		const deletedUser = await Users.findByIdAndDelete(req.params.id);
		if (!deletedUser)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Configure multer to store files with their original extensions
const storage = multer.diskStorage({
	destination: "public/images", // Directory to store images
	filename: (req, file, cb) => {
		// Get the file extension
		const ext = path.extname(file.originalname);
		// Create a unique filename with the original extension
		cb(null, `${Date.now()}-${file.fieldname}${ext}`);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Example: 5 MB size limit
	fileFilter: (req, file, cb) => {
		// Validate file type (e.g., accept only jpeg, png)
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Only image files are allowed!"), false);
		}
		cb(null, true);
	},
});

exports.uploadImg = async (req, res) => {
	upload.single("profilePic")(req, res, async (err) => {
		// Handle multer errors
		if (err instanceof multer.MulterError) {
			return res.status(400).json({ error: err.message });
		} else if (err) {
			return res.status(400).json({ error: err.message });
		}

		// Check if a file was uploaded
		if (!req.file) {
			return res.status(400).json({ error: "Please upload an image file." });
		}

		// Construct the file path including the extension
		const filePath = `/images/${req.file.filename}`;

		try {
			const updatedUser = await Users.findByIdAndUpdate(
				req.query.userId,
				{ avatar: filePath },
				{ new: true }
			);

			// Check if the user was found and updated
			if (!updatedUser) {
				return res.status(404).json({ message: "User not found" });
			}

			// Send the updated user as the response
			res.status(200).json({
				message: "Image uploaded and user updated successfully!",
				user: updatedUser,
				filePath, // Include the file path in the response
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});
};
