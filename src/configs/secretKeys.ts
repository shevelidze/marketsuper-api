import 'dotenv/config';

if (process.env.USERS_JWT_SECRET_KEY === undefined)
  throw new Error(
    'Failed to load users JWT secret key. Please, check your environment.'
  );

if (process.env.ADMIN_JWT_SECRET_KEY === undefined)
  throw new Error(
    'Failed to load admin JWT secret key. Please, check your environment.'
  );

const secretKeys = {
  users: process.env.USERS_JWT_SECRET_KEY,
  admin: process.env.ADMIN_JWT_SECRET_KEY,
};

export default secretKeys;