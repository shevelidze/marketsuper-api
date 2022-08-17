import { Router } from 'express';
import { createValidateTokenMiddleware } from '../middlewares';

const adminRouter = Router();

adminRouter.use(createValidateTokenMiddleware('admin'));
adminRouter.get('/', (req, res) =>
  res.json({ message: 'You are an administrator!' })
);

export default adminRouter;
