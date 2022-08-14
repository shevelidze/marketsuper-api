import express, { Router } from 'express';
import { auth } from '../controllers';

const authRouter = Router();

authRouter.use(express.json());
authRouter.post('/authentificate_with_google_account', (req, res) => {});
authRouter.post('/authentificate_with_email_and_password', (req, res) => {});
authRouter.post('/register', auth.registerController);

export default authRouter;
