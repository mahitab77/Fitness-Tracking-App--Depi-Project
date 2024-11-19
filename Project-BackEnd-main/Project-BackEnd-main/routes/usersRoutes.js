const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Route to create a new user
router.post("/", usersController.createUser);

// Route to get all users
router.get("/", usersController.getUsers);

// Route to get a user by ID
router.get("/byrefresh", usersController.getUserByRefreshToken);

// Route to get a user by ID
router.get("/:id", usersController.getUserById);

// Route to update a user by ID
router.patch("/:id", usersController.updateUser);

// Route to delete a user by ID
router.delete("/:id", usersController.deleteUser);

// Profile picture upload path
router.post("/uploadImg", usersController.uploadImg);

router.get("/uploadImg", usersController.uploadImg);

module.exports = router;
