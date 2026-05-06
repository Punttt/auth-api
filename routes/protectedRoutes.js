const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET /api/profile - måste ha giltig JWT
router.get("/profile", authenticate, async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internt serverfel" });
    }
});