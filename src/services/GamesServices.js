import axios from "axios";

const GAME_API_BASE_URL = "http://localhost:8080/rent-game/games";

class GamesServices {
  getListGames(sortType, categoryId, page) {
    let url = GAME_API_BASE_URL;

    if (sortType) {
      url += `/${sortType}`;
    }

    return axios.get(url, { params: { categoryId, page } });
  }

  getListGamesHome() {
    return axios.get(GAME_API_BASE_URL + "/home");
  }
}

export default new GamesServices();
