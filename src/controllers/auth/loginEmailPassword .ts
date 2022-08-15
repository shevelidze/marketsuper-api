import { RequestHandler } from 'express';
import { requestUsers } from '../../models';
import createHash from '../../utils/createHash';
import { InvalidBodyApiError } from '../../utils/errors';
import { createUserToken } from '../../utils/token';

const loginEmailPasswordController: RequestHandler = async (req, res, next) => {
  const findResult = await requestUsers((collection) => {
    return collection.findOne(
      {
        email: req.body.email,
        passwordHash: createHash(req.body.password),
      },
      {
        projection: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          address: 1,
        },
      }
    );
  });

  if (findResult === null) {
    next(new InvalidBodyApiError('Invalid email or password.'));
    return;
  }

  res.json(
    createUserToken({
      id: findResult._id.toString(),
      email: findResult.email,
      firstName: findResult.firstName,
      lastName: findResult.lastName,
      address: findResult.address,
    })
  );
};

export default loginEmailPasswordController;
