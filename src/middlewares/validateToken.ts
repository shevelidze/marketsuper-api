import { RequestHandler, Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthorizationApiError } from '../utils/errors';
import {
  getTokenFromHeader,
  getTokenPayload,
  TokenPayload,
  TokenType,
} from '../utils/token';

export interface AuthorizedRequest<T> extends Request {
  tokenPayload: T;
}

const unlocked = process.argv.includes('unlocked');

if (unlocked)
  console.warn(
    'The API server is running in the unlocked mode. Anyone can access the API.'
  );

export function createValidateTokenMiddleware(type: TokenType): RequestHandler {
  return (req, res, next) => {
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
      const tokenPayload = getTokenPayload(token);
      if (tokenPayload.type !== type)
        throw new AuthorizationApiError(
          `Invalid token type. Expected ${type}, but got ${tokenPayload.type}.`
        );

      (req as AuthorizedRequest<TokenPayload>).tokenPayload = tokenPayload;
    } catch (e) {
      if (e instanceof JsonWebTokenError)
        throw new AuthorizationApiError(`Invalid JWT token: ${e.message}.`);

      throw e;
    }

    next();
  };
}

export default createValidateTokenMiddleware;
