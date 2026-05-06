const User = require("../models/User");
const bcrypt = require("bcrypt");

// Registrerar ny användare
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kontrollerar att alla fält finns
        if ( !username || !email || !password ){
            return res.status(400).json({ error: "Alla fält krävs" });
        }

        // Hashar lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapar och spara en användare
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Skrier ut bekräftelse, skriver ut följande: ID, Username, Email
        res.status(201).json({
            message: "Användaren är skapad",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error){
        console.error(error);
        res.status(400).json({ error: "Kunde inte skapa ett nytt konto" })
    }
};

// Logga in som användare
const login = async (req, res) => {
    try {

    } catch (error) {
        
    }
};

module.exports = { register };


