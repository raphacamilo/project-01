const { RESTDataSource } = require("apollo-datasource-rest");

class GamesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  async getGames() {
    const games = await this.get("/games");
    return games.map(async (game) => {
      const newCategories = [];

      for (let i = 0; i < game.categories.length; i++) {
        const category = await this.get(`/categories/${game.categories[i]}`);
        newCategories.push(category);
      }

      game.categories = newCategories;
      return game;
    });
  }
}

module.exports = GamesAPI;
