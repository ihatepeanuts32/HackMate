import User from "../models/User.js";
import Onboarding from "../models/Onboarding.js";
import express from "express"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const router = express.Router();

//Naomi - the following POST request allows users to register their account
router.post('/register', async (req, res) => {

    try {

        const { /*firstName, lastName,*/ username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            /*firstName,
            lastName,*/
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

//Naomi - the following POST requeest allows users to log back into their account
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({message: "Error: Invalid credentials", error});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({message: "Error: Invalid password", error});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.json({message: "User logged in successfully", token});

    } catch(error) {
        return res.status(500).json({message: "Unable to login user.", error: error.message});
    }

})

router.post("/onboardUser", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(' ')[1];
              
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
              
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
              
        const user = await User.findById(decoded.userId);
              
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { firstName, lastName,  preferredRole, hackathonsAttended, college, technicalSkills, desiredTeammateQualities} = req.body;

        const hackathons = hackathonsAttended ? parseInt(hackathonsAttended, 10) : 0;

        const onboardUser = new Onboarding({
            userId: decoded.userId,
            firstName,
            lastName,
            preferredRole,
            hackathonsAttended: hackathons,
            college,
            technicalSkills,
            desiredTeammateQualities,
        })

        await onboardUser.save();

        return res.status(200).json({message: "User onboarded sucessfully"});

    } catch (error) {
        return res.status(500).json({message: "Unable to onboard user.", error: error.message});
    }
})

router.put("/updateProfile", async (req, res) => {
    try {

      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const existingProfile = await Onboarding.findOne({ userId: decoded.userId });
      
      if (!existingProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const { firstName, lastName, preferredRole, hackathonsAttended, college, technicalSkills, desiredTeammateQualities } = req.body;
      
      existingProfile.firstName = firstName;
      existingProfile.lastName = lastName;
      existingProfile.preferredRole = preferredRole;
      existingProfile.hackathonsAttended = hackathonsAttended ? parseInt(hackathonsAttended, 10) : 0;
      existingProfile.college = college;
      existingProfile.technicalSkills = technicalSkills;
      existingProfile.desiredTeammateQualities = desiredTeammateQualities;
      
      await existingProfile.save();
      
      return res.status(200).json({ message: "Profile updated successfully" });
      
    } catch (error) {
      return res.status(500).json({ message: "Unable to update profile", error: error.message });
    }
  });

//Naomi - getting user info to be displayed on frontend
router.get('/userProfile', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await Onboarding.findOne({ userId: decoded.userId });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      
    } catch (error) {
      return res.status(500).json({ message: "Unable to fetch user profile", error: error.message });
    }
  })

export default router;