import { RequestHandler } from 'express';
import { Schema, validate } from 'jtd';
import { InvalidBodyApiError } from '../utils/errors';

function createValidateBodyMiddleware(
  schema: Schema,
  errorMessage: string
): RequestHandler {
  return (req, res, next) => {
    const validationErrors = validate(schema, req.body);

    if (validationErrors.length > 0)
      next(new InvalidBodyApiError(errorMessage));
    else next();
  };
}

export default createValidateBodyMiddleware;
