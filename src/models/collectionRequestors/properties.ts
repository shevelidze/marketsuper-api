import { ObjectId } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface Property {
  name: string;
  categoryId: ObjectId;
}

const requestProperties = createCollectionRequestor<Property>('properties');

export default requestProperties;
