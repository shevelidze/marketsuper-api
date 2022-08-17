import { buildSchema } from 'graphql';
import typesDefinition from './types';

const queryDefinition = `#graphql
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
    getItemsFromCategory(categoryId: ID!, parameters: ItemsParameters): [Item!]!
  }
`;

const publicGraphQLSchema = buildSchema(typesDefinition + queryDefinition);

export default publicGraphQLSchema;
