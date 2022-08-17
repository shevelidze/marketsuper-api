import createCollectionRequestor from '../../utils/createCollectionRequestor';

interface Administrator {
  username: string;
  passwordHash: string;
}

const requestAdministrators =
  createCollectionRequestor<Administrator>('administrators');

export default requestAdministrators;
