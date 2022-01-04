const { ApolloServer } = require("apollo-server");
const GamesAPI = require("./apollo/dataSource/game");
const gameResolvers = require("./apollo/resolver/gameResolver");
const gameSchema = require("./apollo/schema/game.graphql");

const typeDefs = [gameSchema];
const resolvers = [gameResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { gamesAPI: new GamesAPI() };
  },
});

server.listen().then(({ url }) => {
  console.log(`Playground: ${url}`);
});
