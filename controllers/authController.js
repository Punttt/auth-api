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
        const { username, password } = req.body;

        // Kontrollerar att fältet finns
        if (!username || !password) {
            return res.status(400).json({ error: "Både användarnamn och lösenord krävs" });
        }

        // Hitta användaren i databasen
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktikt användarnamn eller lösenord" });
        }

        // Jämför inputlösenordet mot det hashade lösenordet.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Felaktikt användarnamn eller lösenord" });
        }

        // Skapa JW token med anvädarens id och username
        const token = jwt.sign(
            { userId: user._id, username: user.usernam },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Skickar tillbaka token till klienten
        res.status(200).json({
            message: "Inloggning lyckades",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internt serverproblem" });
    }
};

module.exports = { register };


