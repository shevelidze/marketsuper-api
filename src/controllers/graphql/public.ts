import { graphqlHTTP } from 'express-graphql';
import { publicGraphQLSchema } from '../../models';

const rootValue = {};

const publicGraphQLController = graphqlHTTP({
  schema: publicGraphQLSchema,
  rootValue,
  graphiql: true,
});

export default publicGraphQLController;
