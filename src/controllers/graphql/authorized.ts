import { graphqlHTTP } from 'express-graphql';
import { AuthorizedRequest } from '../../middlewares/validateToken';
import { authorizedGraphQLSchema } from '../../models';
import { UserTokenPayload } from '../../utils/token';

const rootValue = {
  getMe: (args, req: AuthorizedRequest<UserTokenPayload>) => {
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

const authorizedGraphQLController = graphqlHTTP({
  schema: authorizedGraphQLSchema,
  rootValue,
  graphiql: true,
});

export default authorizedGraphQLController;
