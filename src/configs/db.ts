import 'dotenv/config';
import { MongoClient } from 'mongodb';

const dbURL = process.env.DB_URL;

if (dbURL === undefined)
  throw new Error(
    'Failed to load the database url. Please, check your environment.'
  );

const dbClient = new MongoClient(dbURL);

export default dbClient;
