import express, { Router } from 'express';
import { admin } from '../controllers';
import { createValidateTokenMiddleware } from '../middlewares';

const adminRouter = Router();

adminRouter.use(createValidateTokenMiddleware('admin'));
adminRouter.get('/', (req, res) =>
  res.json({ message: 'You are an administrator!' })
);
adminRouter.post(
  '/upload_image',
  express.raw({ type: ['image/jpeg', 'image/png'], limit: '1mb' }),
  admin.uploadImage
);

export default adminRouter;
