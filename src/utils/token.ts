import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { secretKey } from '../configs';

export function getTokenFromHeader(header: string): string | null {
  const execResult = /(?<=Bearer\s).*/.exec(header);
  return execResult?.[0] || null;
}

export function getTokenPayload(token: string) {
  const tokenPayload = verify(token, secretKey);
  if (typeof tokenPayload === 'string')
    throw new JsonWebTokenError('invalid payload.');

  return tokenPayload;
}
