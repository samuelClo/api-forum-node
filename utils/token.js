import jwt from "jsonwebtoken"
import {JWT_SECRET} from '../env.js'

export const EXPIRE_DURATION_TOKEN = Math.round(new Date().getTime() / 1000);

const getAccessToken = user => {
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn: EXPIRE_DURATION_TOKEN});
    
    return {
        access_token: token
    }
}

export default getAccessToken
