import userRepository from "../repositories/userRepository.js"
import { validationError } from '../utils/errors.js'

export const getUser = async (req, res) => {
    const db = req.app.locals.db;

    try {
        const users = await userRepository.find(db)

        res.send(users)
    } catch (err) {
        throw new Error(err)
    }
};

