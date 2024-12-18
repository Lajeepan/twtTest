const User = require('../models/user');
const generateToken = require('../JWT');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing user
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({ token, user: { id: user._id, name, email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get User Data (Protected)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
