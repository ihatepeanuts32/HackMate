import express from "express";

const router = express.Router();

//Naomi - the following route fectes messages from the db based off the roomId
router.get('/:roomId', async (req, res) => {

    try {

        const messages = await Message.find({ roomId: req.params.roomId });
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
      }
})


export default router;