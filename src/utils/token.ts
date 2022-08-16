import { verify, JsonWebTokenError, JwtPayload, sign } from 'jsonwebtoken';
import { secretKeys } from '../configs';

export interface UserTokenPayload extends JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string | null;
}

export interface AdminTokenPayload extends JwtPayload {
  id: string;
}

export function getTokenFromHeader(header: string): string | null {
  const execResult = /(?<=Bearer\s).*/.exec(header);
  return execResult?.[0] || null;
}

export function getTokenPayload(token: string) {
  const tokenPayload = verify(token, secretKeys.users);
  if (typeof tokenPayload === 'string')
    throw new JsonWebTokenError('invalid payload.');

  return tokenPayload as UserTokenPayload;
}

export function createUserToken(payload: UserTokenPayload) {
  return { token: sign({ ...payload, type: 'user' }, secretKeys.users) };
}

export function createAdminToken(payload: AdminTokenPayload) {
  return { token: sign({ ...payload, type: 'admin' }, secretKeys.admin) };
}
