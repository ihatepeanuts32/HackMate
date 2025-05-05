import express from "express"; 
import Hackathon from "../models/Hackathon.js";
import jwt from "jsonwebtoken"; 

const router = express.Router(); 

/** 
 * Utility function to verify JWT token from request header
 * @param {Object} req - Expresses request object
 * @returns {Object | null} - Decoded token or null if invalid 
 */ 


/**
 * Saivishaal - Description: Get all upcoming hackathon events 
 * Access: Public (no authentication required)
 */

router.get('/get', async (req, res) => {
    try {
        // Fetch all hackathons and sort them by startDate in ascending order
        const hackathons = await Hackathon.find().sort({ startDate: 1 });

        // Extract the names of all hackathons
        const hackathonNames = hackathons.map(hackathon => hackathon.name);
        console.log('Hackathon Names in hackroute:', hackathonNames);

        // Return the list of hackathons as the response
        res.status(200).json(hackathons); 
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch hackathons", 
            error: error.message
        }); 
    }
});

router.get('/getNames', async (req, res) => {
    try {
        // Fetch all hackathons and extract their names
        const hackathons = await Hackathon.find().sort({ startDate: 1 });
        const hackathonNames = hackathons.map(hackathon => hackathon.name);

        // Return the hackathon names as the response
        res.status(200).json(hackathonNames);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch hackathon names",
            error: error.message
        });
    }
});


/** 
 * Earl - Description - Add a new hackathon
 * Access: Private
 */

router.post('/create', async (req, res) => {
    try {
        const { id, name, description, website, startDate, endDate } = req.body;

        const newHackathon = new Hackathon({
            id,
            name,
            description,
            website,
            startDate: new Date(startDate),
            endDate:   new Date(endDate),
        });

        await newHackathon.save();

        res.status(201).json({
            message: "Hackathon created successfully",
            hackathon: newHackathon
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating hackathon",
            error: error.message
        });
    }
});

/** 
 * Earl - Description - Delete a hackathon
 * Access: Private
 */

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Hackathon ID is required" });
        }
        const hackathon = await Hackathon.findById(id);

        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        await Hackathon.findByIdAndDelete(id);

        res.status(200).json({ message: "Hackathon deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting hackathon",
            error: error.message
        });
    }
});


export default router;