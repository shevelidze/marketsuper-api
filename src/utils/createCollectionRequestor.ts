import { Collection } from 'mongodb';
import Requestor from './Requestor';
import requestDb from './requestDb';

export default function createCollectionRequestor<D>(
  name: string
): Requestor<Collection<D>> {
  return (main) => {
    return requestDb(({ db }) => main(db.collection<D>(name)));
  };
}
