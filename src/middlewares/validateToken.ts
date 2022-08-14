import { RequestHandler, Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthorizationApiError } from '../utils/errors';
import {
  getTokenFromHeader,
  getTokenPayload,
  UserTokenPayload,
} from '../utils/token';

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

  if (authorizationHeader === undefined)
    throw new AuthorizationApiError('No Authorization header found.');

  const token = getTokenFromHeader(authorizationHeader);

  if (token === null)
    throw new AuthorizationApiError(
      'Invalid Authorization header. Expected "Bearer <JWT>".'
    );

  try {
    (req as AuthorizedRequest).tokenPayload = getTokenPayload(token);
  } catch (e) {
    if (e instanceof JsonWebTokenError)
      throw new AuthorizationApiError(`Invalid JWT token: ${e.message}.`);

    throw e;
  }

  next();
};

export default validateTokenMiddleware;
