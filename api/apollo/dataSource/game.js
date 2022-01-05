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

  async getGame(id) {
    const game = await this.get(`/games/${id}`);
    const newCategories = [];

    for (let i = 0; i < game.categories.length; i++) {
      const category = await this.get(`/categories/${game.categories[i]}`);
      newCategories.push(category);
    }

    game.categories = newCategories;
    return game;
  }

  async getCategories() {
    const categories = await this.get(`/categories`);
    return categories.map(async (cat) => {
      const games = await this.get("/games");
      const filteredGames = games.filter((game) =>
        game.categories.includes(cat.id)
      );
      const newGames = [];

      filteredGames.map((game) => {
        const newCategories = [];

        for (let i = 0; i < game.categories.length; i++) {
          const category = [...categories];

          newCategories.push(
            category.filter((cat) => cat.id === game.categories[i])[0]
          );
        }

        newGames.push({ ...game, categories: newCategories });
      });

      return {
        data: {
          id: cat.id,
          type: cat.type,
        },
        games: newGames,
      };
    });
  }
}

module.exports = GamesAPI;
