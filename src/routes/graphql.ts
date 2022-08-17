import { Router } from 'express';
import {
  authorizedGraphQLController,
  publicGraphQLController,
} from '../controllers';
import { createValidateTokenMiddleware } from '../middlewares';

const graphqlRouter = Router();

graphqlRouter.use(
  '/authorized',
  createValidateTokenMiddleware('user'),
  authorizedGraphQLController
);
graphqlRouter.use('/public', publicGraphQLController);

export default graphqlRouter;
