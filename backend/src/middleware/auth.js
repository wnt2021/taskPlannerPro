import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dbconfig.js';

const authenticateToken = (req, res ,next) => {
    const token = req.cookies.token;

    if(!token || typeof(token) !== 'string') {
        console.error("No token found in Authorization header");
        return res.status(401).json({message: "Acces denied: no token provided"});
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        req.user = decoded;
        next();
    });
}

export default authenticateToken;