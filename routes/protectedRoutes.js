const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET /api/profile - måste ha giltig JWT
router.get("/profile", authenticate, async (req, res) => {
    try {
        // hämtar user fråpn middleware coh innehåller userId från token
        const user = await User.findById(req.user.userId).select("-password");

        if(!user) {
            return res.status(404).json({ error: "Användaren hittades inte" });
        }

        res.status(200).json({
            message: "Här är din profil",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internt serverfel" });
    }
});

module.exports = router;