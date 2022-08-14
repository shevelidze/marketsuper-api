import { Collection, ObjectId } from 'mongodb';
import Requestor from '../utils/Requestor';
import requestDb from '../utils/requestDb';

export interface User {
  id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  cart: ObjectId[]; // items ids
}

const requestUsers: Requestor<Collection<User>> = (main) => {
  return requestDb(({ db }) => main(db.collection<User>('users')));
};

export { requestUsers };
