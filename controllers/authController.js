import userRepository from "../repositories/userRepository.js"
import {validationError, unauthorizedError, conflictError} from '../utils/errors.js'
import token from "../utils/token.js"
import {EXPIRE_DURATION_TOKEN} from "../utils/token.js"

export const login = async (req, res) => {
    const db = req.app.locals.db;
    const {email, password} = req.body

    if (!email || !password) return validationError(res)

    const user = await userRepository.getUserByEmailAndPassword(db, {email, password})

    if (!user) return unauthorizedError(res)

    const {name} = user

    res.json({
        "data": {
            name,
            email
        },
        "meta": {
            ...token,
            "token_type": "Bearer",
            "expires_in": EXPIRE_DURATION_TOKEN
        }
    })
};

export const register = async (req, res) => {
    const db = req.app.locals.db;
    const {email, password, name} = req.body

    if (!email || !password || !name) return validationError(res)
    
    try {
        const newUser = await userRepository.insertUser(db, {email, password, name})

        res.json({
            "data": {
                name: newUser.name,
                email: newUser.email
            },
            "meta": {
                ...token,
                "token_type": "Bearer",
                "expires_in": EXPIRE_DURATION_TOKEN
            }
        })
    } catch (err) {
        console.log("Error", err)
        return validationError(res, 'Same email')
    }
};
