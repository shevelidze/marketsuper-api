import { verify, JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { secretKey } from '../configs';

export interface UserTokenPayload extends JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
}

export function getTokenFromHeader(header: string): string | null {
  const execResult = /(?<=Bearer\s).*/.exec(header);
  return execResult?.[0] || null;
}

export function getTokenPayload(token: string) {
  const tokenPayload = verify(token, secretKey);
  if (typeof tokenPayload === 'string')
    throw new JsonWebTokenError('invalid payload.');

  return tokenPayload as UserTokenPayload;
}
