import { RequestHandler } from 'express';
import { Binary } from 'mongodb';
import sharp from 'sharp';
import { requestImages } from '../../models';
import { InvalidBodyApiError } from '../../utils/errors';

const uploadImage: RequestHandler = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(
      new InvalidBodyApiError('Invalid body. Expected image in JPG or PNG.')
    );
    return;
  }
  try {
    let image = sharp(req.body);

    const insertResult = await requestImages(async (collection) => {
      return await collection.insertOne({
        data: new Binary(
          await image.flatten({ background: '#FFFFFF' }).jpeg().toBuffer()
        ),
      });
    });

    res.json({ id: insertResult.insertedId.toString() });
  } catch (e) {
    return;
  }
};

export default uploadImage;
