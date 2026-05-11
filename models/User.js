const mongoose = require("mongoose");

// Schema för användarkontos i databasen
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account_created: {
        type: Date,
        default: Date.now
    }
});

// Skapar modellen och exportera
module.exports = mongoose.model("User", userSchema);