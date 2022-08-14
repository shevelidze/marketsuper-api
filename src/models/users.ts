import { Collection, ObjectId } from 'mongodb';
import Requestor from '../utils/Requestor';
import requestDb from '../utils/requestDb';

export interface User {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  address: string | null;
  cart: ObjectId[]; // items ids
}

const requestUsers: Requestor<Collection<User>> = async (main) => {
  return await requestDb(
    async ({ db }) => await main(db.collection<User>('users'))
  );
};

export default requestUsers;
