// Ladda variabler från .env
require("dotenv").config();

// Importerar moduler
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importera routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

// Skapar expressapplikation
const app = express();

// Tillåter CORS
app.use(cors());
app.use(express.json());

// Ansluter till MongoDB via connection variabler i .env
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Ansluten till MongoDB"))
    .catch(err => console.error("MongoDB-anslutningen misslyckades: ", err));

// Kopplar auth-routes till /api
app.use("/api", authRoutes);

// Test-route
app.get("/", (req, res) => {
    res.send("API igång.");
});
// Startar servern på den port som anges i env, med port 3000 som fallbak
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servern ansluten på port: ${PORT}`));