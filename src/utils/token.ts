import {
  verify,
  JsonWebTokenError,
  JwtPayload,
  sign,
  decode,
} from 'jsonwebtoken';
import { secretKeys } from '../configs';

export interface UserTokenConfig {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string | null;
}

export interface AdminTokenConfig {
  id: string;
}

export type TokenType = 'admin' | 'user';

export interface TokenPayload extends JwtPayload {
  type: TokenType;
}

export interface UserTokenPayload extends UserTokenConfig, TokenPayload {
  type: 'user';
}

export interface AdminTokenPayload extends AdminTokenConfig, TokenPayload {
  type: 'admin';
}

export function getTokenFromHeader(header: string): string | null {
  const execResult = /(?<=Bearer\s).*/.exec(header);
  return execResult?.[0] || null;
}

export function getTokenPayload(
  token: string
): AdminTokenPayload | UserTokenPayload {
  let tokenPayload = decode(token);
  if (typeof tokenPayload === 'string')
    throw new JsonWebTokenError('invalid payload.');

  verify(
    token,
    (tokenPayload as TokenPayload).type === 'admin'
      ? secretKeys.admin
      : secretKeys.users
  );

  return tokenPayload as AdminTokenPayload | UserTokenPayload;
}

function packToken(payload: TokenPayload) {
  return {
    token: sign(
      { ...payload },
      payload.type === 'user' ? secretKeys.users : secretKeys.admin
    ),
  };
}

export function createUserToken(payload: UserTokenConfig) {
  return packToken({ ...payload, type: 'user' });
}

export function createAdminToken(payload: AdminTokenConfig) {
  return packToken({ ...payload, type: 'admin' });
}
