import { Binary } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface Image {
  data: Binary;
}

const requestImages = createCollectionRequestor<Image>('images');

export default requestImages;
