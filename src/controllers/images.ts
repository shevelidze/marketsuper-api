import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { requestImages } from '../models';

const imagesController: RequestHandler = async (req, res) => {
  const imageId = (() => {
    try {
      return new ObjectId(req.params.id);
    } catch (e) {
      return null;
    }
  })();

  if (imageId === null) {
    res.status(404).end();
    return;
  }

  const findResult = await requestImages((collection) => {
    return collection.findOne({ _id: imageId }, { projection: { data: 1 } });
  });

  if (findResult === null) {
    res.status(404).end();
    return;
  }

  res.set('Content-type', 'image/jpeg').send(findResult.data.buffer);
};

export default imagesController;
