import { ObjectId } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface User {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  address: string | null;
  cart: ObjectId[]; // items ids
}

const requestUsers = createCollectionRequestor<User>('users');

export default requestUsers;
