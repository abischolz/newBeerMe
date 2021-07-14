const schema = require('./schema');
const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

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

const resolvers = {
  Query: {
    breweries: () => breweries,
    beers: () => beers,
    beer: (parent, args) => {
      const foundBeer = beers.filter((beer) => beer.id === args.id);
      return foundBeer;
    },
    brewery: (parent, args) => {
      const foundBrewery = breweries.filter(
        (brewery) => brewery.id === args.id
      );
      return foundBrewery;
    },
  },
  Mutation: {
    beer: (parent, args) => {
      const beer = {
        name: args.name,
        description: args.description,
      };
      beers.push(beer);
      return beer;
    },
    brewery: (parent, args) => {
      const brewery = {
        name: args.name,
        address: args.address,
      };
      breweries.push(brewery);
      return brewery;
    },
    // updateBrewery: (parent, args) => {},
  },

  Beer: {
    name: (parent) => parent.name,
    description: (parent) => parent.description,
    brewery: (parent) => parent.brewery,
  },
  Brewery: {
    name: (parent) => parent.name,
    address: (parent) => parent.address,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.listen(3000, () => {
  console.log(`🚀  Server ready at 3000`);
});
//express set-up
// const app = express();

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// );
// app.listen(3000, () => {
//   console.log('App listening on port 3000');
// });
