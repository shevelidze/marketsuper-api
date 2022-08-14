import { Router } from 'express';
import { graphqlController } from '../controllers';
import { validateTokenMiddleware } from '../middlewares';

const graphqlRouter = Router();

graphqlRouter.use(validateTokenMiddleware);
graphqlRouter.use(graphqlController);

export default graphqlRouter;
