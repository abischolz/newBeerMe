const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

//dummy data
const beers = [
  {
    name: 'Finback IPA',
    description: 'Classic west coast ipa',
    brewery: 'Finback',
  },
  {
    name: 'Sweet Action',
    description: 'easy drinking Brooklyn ipa',
    brewery: 'Sixpoint',
  },
  {
    name: 'Watermelon Glow-Up',
    description: 'berliner-weisse style sour ale',
    brewery: 'Folksbier',
  },
];

const breweries = [
  {
    name: 'Finback',
    address: 'Queens',
  },
  {
    name: 'Sixpoint',
    address: 'Red Hook',
  },
  {
    name: 'Folksbier',
    address: 'Carrol Gardens',
  },
];

const breweryType = new GraphQLObjectType({
  name: 'brewery',
  fields: {
    name: { type: GraphQLString },
    address: { type: GraphQLString },
  },
});

const beerType = new GraphQLObjectType({
  name: 'beer',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    brewery: {
      type: breweryType,
      resolve: (source, params) => {
        return breweries[source.brewery];
      },
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    brewery: {
      type: breweryType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return breweries[id];
      },
    },
    breweries: {
      type: new GraphQLList(breweryType),
      resolve: () => {
        return breweries;
      },
    },
    beer: {
      type: beerType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return beers[id];
      },
    },
    beers: {
      type: new GraphQLList(beerType),
      resolve: () => {
        return beers;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
