import { Router } from 'express';
import {getUser} from './controllers/userController.js'
import {login, register} from './controllers/authController.js'

const router = new Router();

router.get('/', getUser);
router.post('/login', login);
router.post('/register', register);

export default router;
