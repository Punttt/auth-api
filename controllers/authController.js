const User = require("../models/User");
const bcrypt = require("bcrypt");

// Registrerar ny användare
const register = async (req, res) => {
    try {

    } catch (error){
        console.error(error);
        res.status(400).json({ error: "Kunde inte skapa ett nytt konto" })
    }
};
