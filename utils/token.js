import jwt from "jsonwebtoken"
import {JWT_SECRET} from '../env.js'

export const EXPIRE_DURATION_TOKEN = Math.floor(Date.now() / 1000) + (60 * 60)

console.log(JWT_SECRET)
const accessToken = jwt.sign({
    exp: EXPIRE_DURATION_TOKEN,
}, JWT_SECRET);

export default {accessToken}
