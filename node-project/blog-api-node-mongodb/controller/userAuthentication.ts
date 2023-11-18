import { Request, Response } from "express";
const User = require("../models/userSchema");
const Post = require("../models/postSchema");
const bcrypt = require("bcrypt");
const { validateUser } = require("../validation");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require('../models/blackListTokens');


// User/Admin Signup
const signup = async (req: Request, res: Response) => {
    try {
        let { name, email, password } = req.body;
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if the email already exists
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(400).json({ error: 'User registration failed' });
        }

        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });

        // Save the user to the database
        await newUser.save();
        return res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        console.log("Internal error", error);
    }
}

// User/Admin login
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;


        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Check if the password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Create and sign a JWT token for authentication
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.setHeader("authorization", token);
        res.setHeader("Access-Control-Expose-Headers", "*");

        const isBlacklisted = await BlacklistedToken.exists({ token });

        if (isBlacklisted) {
            return res.status(401).json({ error: "Token is blacklisted. Login is not allowed." });
        }


        return res.status(200).json({ message: "Login successfull", token });
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Login failed." });
    }
}



// Get list of all active users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const fetchUsers = await User.find({}, '-password ').populate('posts', 'postTitle content'); // You can specify the fields you want to retrieve from posts;
        if (!fetchUsers) return res.status(401).json({ message: "No user in database." });
        return res.status(200).json(fetchUsers);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Internal server error" });

    }
}

// Logout API
const logout = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        // Check if the token is already blacklisted
        const isBlacklisted = await BlacklistedToken.exists({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is already blacklisted.' });
        }
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in user logout:', error);
        res.status(500).json({ error: 'Logout failed.' });
    }
};


// BONUS: Deleting user [currently only admin has this access]
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const userPosts = await Post.find({ author: id });

        if (userPosts.length > 0) {
            // User has posts, delete them first
            await Post.deleteMany({ author: id });
        }
        // Use the User model to delete the user by ID
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
}
module.exports = {
    signup,
    login,
    getAllUsers,
    logout,
    deleteUser
};