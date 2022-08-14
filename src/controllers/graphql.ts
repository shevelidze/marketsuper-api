import { graphqlHTTP } from 'express-graphql';
import { AuthorizedRequest } from '../middlewares/validateToken';
import { graphqlSchema } from '../models';

const rootValue = {
  getMe: (args, req: AuthorizedRequest) => {
    return {
      id: req.tokenPayload.id,
      firstName: req.tokenPayload.firstName,
      lastName: req.tokenPayload.lastName,
      email: req.tokenPayload.email,
      address: req.tokenPayload.address,
    };
  },
  getCartItems: () => {
    return [{ name: 'name', description: 'hello' }];
  },
};

const graphqlController = graphqlHTTP({
  schema: graphqlSchema,
  rootValue,
  graphiql: true,
});

export default graphqlController;
