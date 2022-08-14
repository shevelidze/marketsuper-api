import { graphqlHTTP } from 'express-graphql';
import { rootSchema } from '../models';

const rootValue = {
  getMe: () => {
    return {
      firstName: 'Denys',
      lastName: 'Shevel',
    };
  },
  getCartItems: () => {
    return [{ name: 'name', description: 'hello' }];
  },
};

const graphqlController = graphqlHTTP({
  schema: rootSchema,
  rootValue,
  graphiql: true,
});

export default graphqlController;
