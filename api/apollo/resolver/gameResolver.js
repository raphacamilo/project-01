const gameResolvers = {
  Query: {
    games: (parent, args, { dataSources }, info) =>
      dataSources.gamesAPI.getGames(),
    game: (parent, { id }, { dataSources }, info) =>
      dataSources.gamesAPI.getGame(id),
    categories: (parent, args, { dataSources }, info) =>
      dataSources.gamesAPI.getCategories(),
  },
};

module.exports = gameResolvers;
