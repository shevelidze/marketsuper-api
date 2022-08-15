import { RequestHandler } from 'express';
import { requestImages } from '../models';

const imagesController: RequestHandler = (req, res) => {
  console.log(req.params.id);
  res.end();
};

export default imagesController;
