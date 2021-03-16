import { Router } from 'express';
import {login, register, me} from './controllers/authController.js'
import authMiddleware from './middleware/authMiddleware.js'
import {getAllChannels} from "./controllers/channelController.js"

const router = new Router();

router.post('/auth/login', login);
router.post('/auth/register', register);

router.use(authMiddleware)

router.post('/auth/me', me);

router.get('/channels', getAllChannels)

export default router;
