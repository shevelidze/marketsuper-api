import { ObjectId } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface PropertyValue {
  propertyId: ObjectId;
  value: string;
}

const requestPropertyValues =
  createCollectionRequestor<PropertyValue>('propertiesValues');

export default requestPropertyValues;
