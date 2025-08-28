import express from 'express';
import { verifyUser } from '../Controllers/authController.js';
import { loginController } from '../Controllers/loginController.js';
import { passwordController } from '../Controllers/passwordController.js';
import { registrerController } from '../Controllers/registrerController.js';
import { createController } from '../Controllers/createController.js';
import { viewController } from '../Controllers/viewController.js';
import { projectsController } from '../Controllers/projectsController.js';
import { autenticarToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/Home', autenticarToken, verifyUser);
router.post('/Sign-up', registrerController);
router.post('/Login', loginController);
router.post('/Forgot-Password', passwordController);
router.post('/Auth', autenticarToken, verifyUser);
router.post('/Create', createController);
router.post('/View', autenticarToken, viewController);
router.get('/Projects', autenticarToken, projectsController);

export default router;
