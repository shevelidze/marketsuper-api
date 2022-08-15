import { ObjectId } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface Item {
  name: string;
  description?: string;
  price: number;
  properties: ObjectId[]; // properties values ids
  categoryId: ObjectId;
}

const requestItems = createCollectionRequestor<Item>('items');

export default requestItems;
