import { Router } from 'express';
import {
  authorizedGraphQLController,
  publicGraphQLController,
} from '../controllers';
import { validateTokenMiddleware } from '../middlewares';

const graphqlRouter = Router();

graphqlRouter.use(
  '/authorized',
  validateTokenMiddleware,
  authorizedGraphQLController
);
graphqlRouter.use('/public', publicGraphQLController);

export default graphqlRouter;
