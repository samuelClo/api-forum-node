import jwt from "jsonwebtoken"
import {JWT_SECRET} from '../env.js'

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        if (!decodedToken) return

        next();
    } catch (err) {
        console.log('err', err.name)
        res.status(401).json({
            error: err.name
        });
    }
};

export default authMiddleware
