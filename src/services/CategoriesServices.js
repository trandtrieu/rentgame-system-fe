import axios from "axios";

const CATEGORYY_API_BASE_URL = "http://localhost:8080/rent-game/category";

class CategoriesServices {
  getAllCategories() {
    return axios.get(CATEGORYY_API_BASE_URL);
  }
}

export default new CategoriesServices();
