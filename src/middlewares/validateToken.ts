import { RequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { getTokenFromHeader, getTokenPayload } from '../utils/token';
import { sendAuthentificationError } from '../utils/errors';

const unlocked = process.argv.includes('unlocked');

if (unlocked)
  console.warn(
    'The API server is running in the unlocked mode. Anyone can access the API.'
  );

const validateTokenMiddleware: RequestHandler = (req, res, next) => {
  if (unlocked) {
    next();
    return;
  }

  const authorizationHeader = req.get('Authorization');

  if (authorizationHeader === undefined) {
    sendAuthentificationError('No Authorization header found.', res);
    return;
  }

  const token = getTokenFromHeader(authorizationHeader);

  if (token === null) {
    sendAuthentificationError(
      'Invalid Authorization header. Expected "Bearer <JWT>".',
      res
    );
    return;
  }

  try {
    const tokenPayload = getTokenPayload(token);
    console.log(tokenPayload);
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      sendAuthentificationError(`Invalid JWT token: ${e.message}.`, res);
      return;
    }

    throw e;
  }

  next();
};

export default validateTokenMiddleware;
