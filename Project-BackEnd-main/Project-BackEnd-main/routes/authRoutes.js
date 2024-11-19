const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to create a new user
router.post("/register", authController.handleNewUser);

// Route to login
router.post("/login", authController.handleLogin);

// Route to logout
router.get("/logout", authController.handleLogout);

// Route to update access token
router.get("/refresh", authController.handleRefreshToken);

module.exports = router;
