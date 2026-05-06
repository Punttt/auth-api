const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const User = require("../models/User");