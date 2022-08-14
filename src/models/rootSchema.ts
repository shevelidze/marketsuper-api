import { buildSchema } from 'graphql';

const rootSchema = buildSchema(`#graphql
  type User {
    firstName: String!,
    lastName: String!
    cart: [Item!]!
  }
  type Item {
    name: String!,
    description: String!
  }
  type Query {
    me: User
  }
`);

export default rootSchema;
