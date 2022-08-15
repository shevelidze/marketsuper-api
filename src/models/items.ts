import { ObjectId, Collection } from 'mongodb';
import requestDb from '../utils/requestDb';
import Requestor from '../utils/Requestor';

export interface Item {
  name: string;
  description?: string;
  price: number;
  properties: ObjectId[]; // properties values ids
  categoryId: ObjectId;
}

const requestItems: Requestor<Collection<Item>> = (main) => {
  return requestDb(({ db }) => main(db.collection<Item>('items')));
};

export default requestItems;
