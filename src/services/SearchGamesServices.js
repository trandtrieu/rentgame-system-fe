import axios from "axios";

const GAME_API_BASE_URL = "http://localhost:8080/rent-game/games";

class SearchGamesServices {
  searchGames(
    selectedCategories,
    selectedPlatforms,
    keyword,
    currentPage,
    pageSize
  ) {
    let categoriesParam =
      selectedCategories && selectedCategories.length > 0
        ? selectedCategories.join(",")
        : "";
    let platformsParam =
      selectedPlatforms && selectedPlatforms.length > 0
        ? selectedPlatforms.join(",")
        : "";

    const params = {
      categories: categoriesParam,
      platforms: platformsParam,
      keyword: keyword,
      page: currentPage,
      size: pageSize,
    };

    const url = `${GAME_API_BASE_URL}/search`;
    console.log("Sending request to:", url);
    console.log("Request params:", params);

    return axios.get(url, { params });
  }

  getKeywordsRandom() {
    return axios.get(GAME_API_BASE_URL + "/keywords");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SearchGamesServices();
