const express = require('express');
const { registerUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post('/register', registerUser);  // Register User
router.get('/me', authorize, getUser);   // Get Logged-in User Data
router.put('/update', authorize, updateUser);  // Update User
router.delete('/delete', authorize, deleteUser); // Delete User

module.exports = router;
