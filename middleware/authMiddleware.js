import jwt from "jsonwebtoken"
import env from '../env.js'

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        
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
