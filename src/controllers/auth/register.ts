import { RequestHandler } from 'express';
import { requestUsers } from '../../models';
import { InvalidBodyApiError } from '../../utils/errors';
import { createUserToken } from '../../utils/token';
import createHash from '../../utils/createHash';

const registerController: RequestHandler = async (req, res, next) => {
  try {
    const insertResult = await requestUsers(async (collection) => {
      const queryResult = await collection.findOne({ email: req.body.email });

      if (queryResult !== null)
        throw new InvalidBodyApiError(
          'This email has been already used in another account.'
        );

      return await collection.insertOne({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: null,
        cart: [],
        passwordHash: createHash(req.body.password),
      });
    });

    res.json(
      createUserToken({
        id: insertResult.insertedId.toString(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: null,
      })
    );
  } catch (e) {
    next(e);
    return;
  }
};

export default registerController;
