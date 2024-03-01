import axios from "axios";

const REPLY_API_BASE_URL = "http://localhost:8080/rent-game/game/reply";

class ReplyServices {
    getReplyByFeedbackId(feedbackId) {
        return axios.get(REPLY_API_BASE_URL + "/getByFeedbackId?feedBackId=" + feedbackId);
    }
    addReplyByFeedback(feedbackId, userId, reply, accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json", // Assuming the reply data is in JSON format
            },
        };

        return axios.post(
            `${REPLY_API_BASE_URL}/add?feedbackId=${feedbackId}&user_id=${userId}`,
            reply,
            config
        );
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReplyServices();
