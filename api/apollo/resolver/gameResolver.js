const gameResolvers = {
  Query: {
    games: (parent, args, { dataSources }, info) =>
      dataSources.gamesAPI.getGames(),
  },
};

module.exports = gameResolvers;
