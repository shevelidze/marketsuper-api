import 'dotenv/config';

if (process.env.JWT_SECRET_KEY === undefined)
  throw new Error(
    'Failed to load JWT secret key. Please, check your environment.'
  );

export default process.env.JWT_SECRET_KEY;