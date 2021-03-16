import { Router } from 'express';
import {login, register, me} from './controllers/authController.js'
import authMiddleware from './middleware/authMiddleware.js'

const router = new Router();

router.post('/auth/login', login);
router.post('/auth/register', register);

router.use(authMiddleware)

router.post('/auth/me', me);

export default router;
