const Users = require("../models/usersModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register new user
const handleNewUser = async (req, res) => {
	const { name, password, email, gender } = req.body;
	if (!name || !password || !email || !gender)
		return res
			.status(400)
			.json({ message: "Name, email and password are required." });

	// check for duplicate usernames in the db
	const duplicate = await Users.findOne({ email: email });
	if (duplicate)
		return res
			.status(409)
			.json({ message: "This email is already registered" }); //Conflict
	try {
		//encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10);
		//store the new user
		const newUser = {
			name,
			email,
			password: hashedPwd,
			gender,
		};

		const user = new Users(newUser);
		const savedUser = await user.save();

		console.log(savedUser);

		res.status(201).json({ success: `New user ${savedUser.name} created!` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// log user in
const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res
			.status(400)
			.json({ message: "Email and password are required." });

	const foundUser = await Users.findOne({ email: email });

	if (!foundUser) return res.sendStatus(401); //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const role = foundUser.role;
		// create JWTs
		const accessToken = jwt.sign(
			{
				UserInfo: {
					email: foundUser.email,
					role: role,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);
		const refreshToken = jwt.sign(
			{ email: foundUser.email },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		// Saving refreshToken with current user
		const updatedUser = await Users.findByIdAndUpdate(
			foundUser.id,
			{ ...foundUser._doc, refreshToken: refreshToken },
			{
				new: true,
			}
		);

		console.log("user is updated", updatedUser);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({
			accessToken,
			// user: foundUser,
			user: {
				name: foundUser.name,
				email: foundUser.email,
				role: foundUser.role,
				avatar: foundUser.avatar || null,
				dateOfBirth: foundUser.dateOfBirth || null,
				gender: foundUser.gender || null,
				id: foundUser._id,
			},
		});
	} else {
		res.sendStatus(401);
	}
};

// get new access token from refresh tokken
const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const foundUser = await Users.findOne({ refreshToken: refreshToken });

	if (!foundUser) return res.sendStatus(403); //Forbidden
	// evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
		const role = foundUser.role;
		const accessToken = jwt.sign(
			{
				UserInfo: {
					email: decoded.email,
					role: role,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);
		res.json({ accessToken });
	});
};

// log user out
const handleLogout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies;
	console.log(cookies.jwt);

	if (!cookies?.jwt)
		return res.status(204).json({ message: "no cookies found" });
	const refreshToken = cookies.jwt;

	// Is refreshToken in db?
	const foundUser = await Users.findOne({ refreshToken: refreshToken });
	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
		return res.status(204).json({ message: "no user found" });
	}

	// Delete refreshToken in db
	const updatedUser = await Users.findByIdAndUpdate(
		foundUser.id,
		{ ...foundUser._doc, refreshToken: null },
		{
			new: true,
		}
	);
	console.log("user is logged out", updatedUser);

	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.status(200).json({ message: "user logged out successfully" });
};

module.exports = {
	handleLogin,
	handleNewUser,
	handleRefreshToken,
	handleLogout,
};
