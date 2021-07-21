const schema = require('./schema');
const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

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
    breweries: (parent, args, context) => context.prisma.brewery.findMany(),
    beers: (parent, args, context) => context.prisma.beer.findMany(),
    beer: (parent, args, context) => {
      const foundBeer = context.prisma.beer.findUnique({
        where: {
          id: args.id,
        },
      });
      return foundBeer;
      // const foundBeer = beers.filter((beer) => beer.name === args.name);
      // return foundBeer;
    },
    brewery: (parent, args, context) => {
      const foundBrewery = context.prisma.brewery.findUnique({
        where: {
          id: args.id,
        },
      });
      // const foundBrewery = breweries.filter(
      //   (brewery) => brewery.name === args.name
      // );
      return foundBrewery;
    },
  },
  Mutation: {
    addBeer: (parent, args, context) => {
      const newBeer = context.prisma.beer.create({
        data: {
          name: args.name,
          description: args.description,
          brewery: { connect: { id: 2 } },
        },
      });
      // const beer = {
      //   name: args.name,
      //   description: args.description,
      // };
      // beers.push(beer);
      return newBeer;
    },
    addBrewery: (parent, args, context) => {
      const newBrewery = context.prisma.brewery.create({
        data: {
          name: args.name,
          address: args.address,
        },
      });
      // const brewery = {
      //   name: args.name,
      //   address: args.address,
      // };
      // breweries.push(brewery);
      return newBrewery;
    },
    // this is not working correctly - pls fix
    updateBrewery: (parent, args, context) => {
      const updatedBrewery = context.prisma.brewery.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          address: args.address,
        },
      });
      return updatedBrewery;
      // const index = breweries.findIndex(
      //   (brewery) => brewery.name === args.name
      // );
      // const brewery = breweries[index];
      // if (brewery.name !== args.name) {
      //   brewery.name = args.name;
      // }
      // if (brewery.address !== args.address) {
      //   brewery.address = args.address;
      // }
      // if (brewery.beers !== args.beers) {
      //   brewery.beers = args.beers;
      // }
      // return brewery;
    },
    //test when db is connected
    deleteBrewery: (parent, args) => {
      breweries.splice(
        breweries.findIndex((brewery) => brewery.name === args.name),
        1
      );
      return breweries;
    },
    updateBeer: (parent, args, context) => {
      const updatedBeer = context.prisma.beer.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          description: args.description,
        },
      });
      return updatedBeer;
      // const index = beers.findIndex((beer) => beer.name === args.name);
      // const beer = beers[index];
      // if (beer.name !== args.name) {
      //   beer.name = args.name;
      // }
      // if (beer.description !== args.description) {
      //   beer.description = args.description;
      // }
      // if (beer.brewery !== args.brewery) {
      //   beer.brewery = args.brewery;
      // }
      // return beer;
    },
    deleteBeer: (parent, args) => {
      beers.splice(beers.findIndex((beer) => beer.name === args.name));
      return beers;
    },
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

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: {
    prisma,
  },
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
