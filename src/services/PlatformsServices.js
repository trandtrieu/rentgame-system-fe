/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const PLATFORM_API_BASE_URL = "http://localhost:8080/rent-game/platform";

class PLatformsServices {
  getAllPlatforms() {
    return axios.get(PLATFORM_API_BASE_URL);
  }
}

export default new PLatformsServices();
