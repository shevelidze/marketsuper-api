import { buildSchema } from 'graphql';
import typesDefinition from './types';

const queryMutationDefinition = `#graphql
  type Query {
    getMe: Me!,
    getCartItems: [Item!]!,
    getOrders: [Order!]!,
  }
  `;

const authorizedGraphQLSchema = buildSchema(
  typesDefinition + queryMutationDefinition
);

export default authorizedGraphQLSchema;
