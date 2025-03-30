import User from "../models/User.js";
import express from "express"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"

const router = express.Router();

//Naomi - the following POST request allows users to register their account
router.post('/register', async (req, res) => {

    try {

        const { firstName, lastName, username, email, password, } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            username, 
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully.",
            token: generateToken(newUser._id),
            userId: newUser._id
        });

        
        
    } catch (error) {
        return res.status(500).json({message: "Unable to register user.", error: error.message});
    }
})

export default router;