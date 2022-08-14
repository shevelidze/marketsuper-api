import { dbClient } from '../configs';
import { MongoClient, Db } from 'mongodb';
import Requestor from './Requestor';

const requestDb: Requestor<{ db: Db; client: MongoClient }> = async (main) => {
  try {
    await dbClient.connect();
    return await main({ db: dbClient.db('market-super'), client: dbClient });
  } finally {
    dbClient.close();
  }
};

export default requestDb;
