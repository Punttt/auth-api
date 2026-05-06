const jwt = require("jsonwebtoken");

// Middleware som verifierar JWT i headern
const authenticate = (req, res, next) => {
    const authHeader = req.header.authorization;

    if( !authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ error: "Ingen giltig token skickades" });
    }
    
    // Hämta tokenet
    const token = authHeader.split(" ")[1];
}