/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/rent-game/account";

class UserService {
  getInfoUser(accountId, token) {
    // Set the Authorization header in the config object
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Pass the config object as the second parameter
    return axios.get(USER_API_BASE_URL + "/" + accountId, config);
  }
}

export default new UserService();
