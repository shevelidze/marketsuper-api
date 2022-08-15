import { ObjectId } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface Category {
  parentId: ObjectId | null;
  name: string;
}

const requestCategories = createCollectionRequestor<Category>('categories');

export default requestCategories;
