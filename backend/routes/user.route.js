import express from 'express';
import { getUser, loginUser, logout, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/getuser').get(getUser);


export default router;