const typesDefinition = `#graphql
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
  type PropertyValue {
    id: ID!,
    value: String!
  }
  type Property {
    id: ID!,
    name: String!,
    values: [PropertyValue!]!
  }
  type Category {
    id: ID!,
    name: String!,
    parent: Category,
    subcategories: [Category!]!,
    properties: [Property!]!
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
`;

export default typesDefinition;
