import { graphqlHTTP } from 'express-graphql';
import { rootSchema } from '../models';

const rootValue = {
  hello: () => {
    return 'Hello world!';
  },
  me: (a) => {
    return {
      firstName: 'Denys',
      lastName: 'Shevel',
      cart: (b) => {
        console.log(b);
        return [{ name: 'name', description: 'hello' }];
      },
    };
  },
};

const graphqlController = graphqlHTTP({
  schema: rootSchema,
  rootValue,
  graphiql: true,
});

export default graphqlController;
