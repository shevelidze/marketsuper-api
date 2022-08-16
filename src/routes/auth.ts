import express, { Router } from 'express';
import { Schema } from 'jtd';
import { auth } from '../controllers';
import { createValidateBodyMiddleware } from '../middlewares';

const emailPasswordSchema: Schema = {
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

const usernamePasswordSchema: Schema = {
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

const userDataSchema: Schema = {
  properties: {
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string' },
  },
};

const authRouter = Router();

authRouter.use(express.json());
authRouter.post('/authentificate_with_google_account', (req, res) => {});
authRouter.post(
  '/login_with_email_and_password',
  createValidateBodyMiddleware(
    emailPasswordSchema,
    'Expected json which contains email and password.'
  ),
  auth.loginEmailPasswordController
);
authRouter.post(
  '/login_admin',
  createValidateBodyMiddleware(
    usernamePasswordSchema,
    'Expected json which contains username and password.'
  ),
  auth.loginAdminController
);
authRouter.post(
  '/register',
  createValidateBodyMiddleware(
    userDataSchema,
    'Expected json which contains email, first and last names and password.'
  ),
  auth.registerController
);

export default authRouter;
