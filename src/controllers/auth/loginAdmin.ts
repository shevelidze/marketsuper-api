import { RequestHandler } from 'express';
import createHash from '../../utils/createHash';
import { requestAdministrators } from '../../models';
import { InvalidBodyApiError } from '../../utils/errors';
import { createAdminToken } from '../../utils/token';

const loginAdminController: RequestHandler = async (req, res, next) => {
  const findResult = await requestAdministrators((collection) => {
    return collection.findOne(
      {
        username: req.body.username,
        passwordHash: createHash(req.body.password),
      },
      { projection: { _id: 1 } }
    );
  });

  if (findResult === null) {
    next(new InvalidBodyApiError('Invalid username or password.'));
    return;
  }

  res.json(createAdminToken({ id: findResult._id.toString() }));
};

export default loginAdminController;
