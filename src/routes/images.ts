import { Router } from 'express';
import imagesController from '../controllers/images';

const imagesRouter = Router();
imagesRouter.get('/:id', imagesController);

export default imagesRouter;
