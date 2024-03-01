/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const FEEDBACK_API_BASE_URL =
    "http://localhost:8080/rent-game/game/feedback/";

class FeedbackServices {
    getFeedbackByGameId(gameId) {
        return axios.get(FEEDBACK_API_BASE_URL + "getFeedback?gameId=" + gameId);
    }

    deleteFeedback(gameId, user_id) {
        return axios.delete(
            FEEDBACK_API_BASE_URL + "delete?feedbackId=" + gameId + "&user_id=" + user_id
        );
    }

    addFeedback(gameId, user_id, feedback, accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json", // Assuming feedback data is in JSON format
            },
        };

        return axios.post(
            `${FEEDBACK_API_BASE_URL}add?game_id=${gameId}&user_id=${user_id}`,
            feedback,
            config
        );
    }

    getAverageRatingByGameId(gameId) {
        return axios.get(FEEDBACK_API_BASE_URL + "averageRating/" + gameId);
    }

    getTotalFeedbackbyRating(gameId, rating) {
        return axios.get(FEEDBACK_API_BASE_URL + gameId + "/" + rating);
    }
    countFeedbackByGameId(gameId) {
        return axios.get(FEEDBACK_API_BASE_URL + gameId + "/countFeedback");
    }
}

export default new FeedbackServices();
