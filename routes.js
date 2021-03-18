import { Router } from 'express';
import {login, register, me} from './controllers/authController.js'
import authMiddleware from './middleware/authMiddleware.js'
import {getAllChannels} from "./controllers/channelController.js"
import {getAllThreads, createThread} from './controllers/threadController.js'

const router = new Router();

router.post('/auth/login', login);
router.post('/auth/register', register);

router.use(authMiddleware)

router.post('/auth/me', me);

router.get('/channels', getAllChannels)

router.get('/threads', getAllThreads)
router.post('/threads', createThread)
// router.get('/thread/')

export default router;
