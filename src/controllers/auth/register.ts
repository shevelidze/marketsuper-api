import { RequestHandler } from 'express';
import { Schema, validate } from 'jtd';
import { requestUsers } from '../../models';
import { InvalidBodyApiError } from '../../utils/errors';
import { createUserToken } from '../../utils/token';
import createHash from '../../utils/createHash';

const bodySchema: Schema = {
  properties: {
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string' },
  },
};

const registerController: RequestHandler = async (req, res, next) => {
  const validationErrors = validate(bodySchema, req.body);

  if (validationErrors.length > 0) {
    next(
      new InvalidBodyApiError(
        'Expected json which contains email, first and last names and password.'
      )
    );
    return;
  }

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

    res.json({
      token: createUserToken({
        id: insertResult.insertedId.toString(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: null,
      }),
    });
  } catch (e) {
    next(e);
    return;
  }
};

export default registerController;
