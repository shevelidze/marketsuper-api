import { RequestHandler, Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import {
  getTokenFromHeader,
  getTokenPayload,
  UserTokenPayload,
} from '../utils/token';
import { sendAuthentificationError } from '../utils/errors';

export interface AuthorizedRequest extends Request {
  tokenPayload: UserTokenPayload;
}

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
    (req as AuthorizedRequest).tokenPayload = getTokenPayload(token);
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
