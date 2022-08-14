import { buildSchema } from 'graphql';

const graphqlSchema = buildSchema(`#graphql
  type User {
    id: ID!,
    firstName: String!,
    lastName: String!,
  }
  type Me {
    id: ID!,
    firstName: String!,
    lastName: String!,
    email: String!,
    address: String
  }
  type Review {
    id: ID!,
    user: User!,
    rating: Float,
    text: String
  }
  type ItemProperty {
    name: String!,
    value: String!
  }
  type Item {
    id: ID!,
    name: String!,
    description: String!,
    price: Float!,
    reviews: [Review!]!,
    properties: [ItemProperty!]!

  }
  enum OrderStatus {
    NEW,
    IN_PROCESS,
    DELIVERING,
    FINISHED,
    CANCELED
  }
  type Order {
    user: User!,
    cart: [Item!]!,
    address: String!,
    status: OrderStatus!
  }
  type CategoryPropertyValue {
    id: ID!,
    value: String!
  }
  type CategoryProperty {
    id: ID!,
    name: String!,
    values: [CategoryPropertyValue!]!
  }
  type Category {
    id: ID!,
    name: String!,
    subcategories: [Category!]!,
    properties: [CategoryProperty!]!
  }
  type SortingValue {
    id: ID!,
    text: String!
  }
  type Sorting {
    id: ID!,
    name: String!,
    values: [SortingValue!]!
  }
  input PriceRange {
    from: Float!,
    to: Float!
  }
  input SortingDefinition {
    sortingId: ID!,
    valueId: ID!
  }
  input ItemsParameters {
    priceRange: PriceRange,
    propertiesValuesIds: [ID!]
    sortings: [SortingDefinition!]!
  }
  type Query {
    getMe: Me!,
    getCartItems: [Item!]!,
    getOrders: [Order!]!,
    getItemsFromCategory(categoryId: ID!, parameters: ItemsParameters): [Item!]!
  }
`);

export default graphqlSchema;
