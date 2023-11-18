import { Response, Request, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const BlacklistedToken = require('../models/blackListTokens');



const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let payload = req.headers.authorization;
    if (!payload) {
        return res.status(401).json({ message: 'No token provided..' });
    }
    let token = payload.split(" ");
    if (token.length != 2) {
        return res.status(401).json({ message: 'Not a valid format' });
    }

    const actualToken = token[1]; // Extract token part (without "Bearer" prefix)
    const formattedToken = `Bearer ${actualToken}`; // Add "Bearer" prefix for consistent format

    const isBlacklisted = await BlacklistedToken.exists({ token: formattedToken });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted.' });
    }

    try {
        let data = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
        let exp = new Date(data.exp);
        if (exp >= new Date()) {
            return res.status(401).json({ message: 'Token expired' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not a valid token." })

    }
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let payload = req.headers.authorization;

    if (!payload) {
        return res.status(401).json({ message: 'No token provided..' });
    }
    let token = payload.split(" ");
    if (token.length != 2) {
        return res.status(401).json({ message: 'Not a valid format' });
    }
    let userId, user;
    try {
        let data = jwt.verify(token[1], process.env.JWT_SECRET_KEY);

        userId = data._id;
        user = await User.findById(userId);

        let exp = new Date(data.exp);
        if (exp >= new Date()) {
            return res.status(401).json({ message: 'Token expired' });
        }

        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: "Forbidden - Not an admin" });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Not a valid token' });
    }
}


const checkTokenBlacklist = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistedToken.exists({ token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted.' });
    }

    // Token is valid, proceed to the next middleware or route
    next();
};


exports.verifyToken = verifyToken;
exports.verifyAdmin = verifyAdmin;
exports.checkTokenBlacklist = checkTokenBlacklist;