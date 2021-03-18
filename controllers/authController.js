import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

import userRepository from "../repositories/userRepository.js"
import {validationError, unauthorizedError} from '../utils/errors.js'
import getAccessToken from "../utils/token.js"
import {EXPIRE_DURATION_TOKEN} from "../utils/token.js"
import {JWT_SECRET} from "../env.js"

export const login = async (req, res) => {
    const db = req.app.locals.db;
    const {email, password} = req.body

    if (!email || !password) return validationError(res)

    const verifiedUser = await userRepository.getUserByEmail(db, email)

    if (!verifiedUser)
        return unauthorizedError(res)

    const validPassword = await bcrypt.compare(password, verifiedUser.password);
    if (!validPassword)  return unauthorizedError(res)
    
    res.json({
        "data": {
            name: verifiedUser.name,
            email: verifiedUser.email
        },
        "meta": {
            ...getAccessToken(verifiedUser),
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
                ...getAccessToken(newUser),
                "token_type": "Bearer",
                "expires_in": EXPIRE_DURATION_TOKEN
            }
        })
    } catch {
        return validationError(res, 'Same email')
    }
};

export const me = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    const {user: {name, email}} = decodedToken

    res.json({"data": {name, email}})
};
