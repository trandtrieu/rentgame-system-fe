import React, { Component } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faFileInvoice,
  faGamepad,
  faHeart,
  faImage,
  faMoneyBill,
  faStar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import FeedbackServices from "../services/FeedbackServices";
import ReplyServices from "../services/ReplyServices";
// import { AuthContext } from "../AuthContext";
import Modal from "react-modal";
// import addProductToCart, { convertDollarToVND } from "../utils/cartutils";
// import addWishListProduct from "../utils/wishlistutils";
import { Link } from "react-router-dom/cjs/react-router-dom";
import gameServices from "../services/gameServices";
import { AuthContext } from "../context/authContext";
import Footer from "../layouts/Footer";
import FeedbackComponent from "./FeedbackComponent";
import StarRating from "./StarRating";
import { convertDollarToVND } from "../util/convert";
import { getAccountById } from "../services/AccountService";

class DetailProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: this.props.match.params.gameId,
      game: {},
      games: [],
      imageUrls: [],
      categories: [],
      platforms: [],
      videoUrls: [],
      feedbacks: [],
      replies: [],
      quantity: 1,
      isModalOpen: false,
      countFeedback: "",
    };
    this.openReply = this.openReply.bind(this);
    this.hiddenReply = this.hiddenReply.bind(this);
    this.starRating = this.starRating.bind(this);
    this.changeReply = this.changeReply.bind(this);
    this.postReply = this.postReply.bind(this);
  }
  static contextType = AuthContext;

  componentDidMount() {
    Modal.setAppElement("#root");
    gameServices
      .getGameById(this.state.gameId)
      .then((res) => {
        const gameData = res.data;
        const imageUrls = gameData.imageUrls || [];
        const categories = gameData.categories || [];
        const videoUrls = gameData.videoUrls || [];
        this.setState({ game: gameData, imageUrls, categories, videoUrls });
        console.log("result: ", this.state.game);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error fetching game:", error);
        this.props.history.push("/home");
      });
    const { accountId, token } = this.context;

    getAccountById(accountId, token)
      .then((response) => {
        this.setState({ account: response.data });
        console.log("Account info:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching account:", error);
      });
    gameServices
      .get5GamesRandom()
      .then((res) => {
        this.setState({ games: res.data });
        console.log(this.state.games);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });

    FeedbackServices.getAverageRatingByGameId(this.state.gameId).then((res) => {
      this.setState({ average: res.data });
    });

    FeedbackServices.getTotalFeedbackbyRating(this.state.gameId, 1).then(
      (res) => {
        this.setState({
          feedbackOneStar: res.data,
        });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.gameId, 2).then(
      (res) => {
        this.setState({ feedbackTwoStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.gameId, 3).then(
      (res) => {
        this.setState({ feedbackThreeStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.gameId, 4).then(
      (res) => {
        this.setState({ feedbackFourStar: res.data });
      }
    );
    FeedbackServices.getTotalFeedbackbyRating(this.state.gameId, 5).then(
      (res) => {
        this.setState({ feedbackFiveStar: res.data });
      }
    );

    FeedbackServices.countFeedbackByGameId(this.state.gameId).then((res) => {
      this.setState({
        countFeedback: res.data,
      });
    });

    FeedbackServices.getFeedbackByGameId(this.state.gameId).then((res) => {
      this.setState({
        feedbacks: res.data,
        star: res.data.rating,
      });
      console.log(res.data);

      // Lặp qua danh sách các phản hồi và lấy phản hồi cho từng phản hồi
      res.data.forEach((feedback) => {
        ReplyServices.getReplyByFeedbackId(feedback.feedback_id).then(
          (replyRes) => {
            feedback.replies = replyRes.data; // Lưu danh sách phản hồi vào phản hồi tương ứng
            this.forceUpdate(); // Cập nhật lại giao diện sau khi có dữ liệu
          }
        );
        console.log(feedback.replies);
      });
    });
    // if (this.state.product.type === 0) {
    //     this.openModal();
    //     console.log("check type: " + this.state.product.type);
    // }
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
    console.log("opened");
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  deleteFeedback(id) {
    FeedbackServices.deleteFeedback(id).then((res) => {
      this.setState({
        feedbacks: this.state.feedbacks.filter(
          (feedback) => feedback.feedback_id !== id
        ),
      });
    });
  }

  calculateStarRatingPercentage(starRating) {
    const {
      feedbackOneStar,
      feedbackTwoStar,
      feedbackThreeStar,
      feedbackFourStar,
      feedbackFiveStar,
    } = this.state;

    // Tính tổng số lượng feedback
    const totalFeedback =
      feedbackOneStar +
      feedbackTwoStar +
      feedbackThreeStar +
      feedbackFourStar +
      feedbackFiveStar;

    if (totalFeedback === 0) {
      return 0;
    }

    let ratingCount;
    switch (starRating) {
      case 1:
        ratingCount = feedbackOneStar;
        break;
      case 2:
        ratingCount = feedbackTwoStar;
        break;
      case 3:
        ratingCount = feedbackThreeStar;
        break;
      case 4:
        ratingCount = feedbackFourStar;
        break;
      case 5:
        ratingCount = feedbackFiveStar;
        break;
      default:
        ratingCount = 0;
    }

    const ratingPercentage = (ratingCount / totalFeedback) * 100;
    return ratingPercentage;
  }

  changeReply = (e) => {
    this.setState({ replyByFeedback: e.target.value });
    console.log(e.target.value);
  };

  postReply = (feedbackId) => {
    // e.preventDefault();

    if (this.state.replyByFeedback.trim() === "") {
      toast.error("Reply cannot be empty");
    } else {
      let reply = {
        reply_feedback: this.state.replyByFeedback,
      };
      ReplyServices.addReplyByFeedback(feedbackId, 1, reply).then((res) => {
        toast.success("Reply submitted successfully");
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  openReply = (feedbackId) => {
    const replyDiv = document.getElementById(`replyDiv${feedbackId}`);
    if (replyDiv) {
      replyDiv.style.display = "block";
    }
    console.log(replyDiv);
  };

  hiddenReply = (feedbackId) => {
    const replyDiv = document.getElementById(`replyDiv${feedbackId}`);
    if (replyDiv) {
      replyDiv.style.display = "none";
    }
  };
  starRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <FontAwesomeIcon key={i} style={{ color: "orange" }} icon={faStar} />
      );
    }
    return stars;
  };

  render() {
    const { accountId, token } = this.context;

    return (
      <>
        <div className="tournament-details pb-10 pt-120 mt-lg-0 mt-sm-15 mt-10 overflow-hidden">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex align-items-center gap-4 mb-4">
                  <a
                    href="javascript:void(0)"
                    onclick="window.history.back()"
                    className="back-btn"
                  >
                    <i className="ti ti-arrow-narrow-left fs-2xl" />
                  </a>
                  <div className="red-ball bot-50" />
                  <h3 className="tcn-1 cursor-scale growDown title-anim">
                    Game Name
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <picture>
                  <img
                    style={{ height: "300px", objectFit: "inherit" }}
                    src={`../assets/img/${this.state.imageUrls[0]}`}
                    className="img-fluid img-thumbnail w-100 rounded "
                    alt="..."
                  />
                </picture>
              </div>
              <div className="col-md-9">
                <h3 className="tcn-1 cursor-scale growDown title-anim mt-sm-4 mt-col-4">
                  {this.state.game.name}
                </h3>
                <p className="mt-4 mb-4">{this.state.game.describe}</p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span>
                        {" "}
                        Date Released: {this.state.game.dateReleased}
                      </span>{" "}
                      <br />
                    </div>
                    <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span>
                        {" "}
                        Price: {convertDollarToVND(this.state.game.price)} VND
                        per hour
                      </span>{" "}
                      <br />
                    </div>
                    <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span> Age Limit: {this.state.game.ageLimit}</span>
                    </div>
                  </div>
                  <div className="col-md-5">
                    {/* <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span>
                        {" "}
                        Categories:
                        {this.state.categories.map((category) => (
                          <li key={category} style={{ paddingRight: "9px" }}>
                            {category}
                          </li>
                        ))}{" "}
                      </span>{" "}
                      <br />
                    </div> */}
                    <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span> Stock: {this.state.game.stock}</span> <br />
                    </div>
                    <div className="m-5">
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                        icon={faGamepad}
                        bounce
                      />
                      <span>
                        {" "}
                        Rating {this.state.game.rating}{" "}
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "#FFD43B" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-8">
              <div className="col-12 col-md-8 col-sm-12">
                <h3 className="tcn-1 cursor-scale growDown title-anim">
                  {this.state.game.name}
                </h3>
                <p className="mb-5 mt-3">{this.state.game.note}</p>
                <h3 className="tcn-1 cursor-scale growDown title-anim mb-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ color: "#fe501b", marginRight: "10px" }}
                  />
                  Game Screenshot
                </h3>
                <div className="rounded mb-5 ">
                  <div
                    className="carousel slide"
                    id="carouselDemo"
                    data-bs-wrap="true"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-inner">
                        {this.state.imageUrls.map((imageUrl, index) => (
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            key={index}
                          >
                            <img
                              style={{ height: "400px" }}
                              src={`../assets/img/${imageUrl}`}
                              className="w-100 img-fluid"
                              alt={`Image ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselDemo"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselDemo"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                    </button>
                    <div style={{}} className="carousel-indicators">
                      {this.state.imageUrls.map((imageUrl, index) => (
                        <button
                          key={index}
                          type="button"
                          className={index === 0 ? "active" : ""}
                          data-bs-target="#carouselDemo"
                          data-bs-slide-to={index}
                          age
                        >
                          <img
                            style={{ width: "70px", height: "45px" }}
                            src={`../assets/img/${imageUrl}`}
                            alt={`Slide ${index}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <h3
                  style={{ marginTop: 50 }}
                  className="tcn-1 cursor-scale growDown title-anim mb-5"
                >
                  <FontAwesomeIcon
                    icon={faVideo}
                    style={{ color: "#f84b1a", marginRight: "10px" }}
                  />
                  Game videos{" "}
                </h3>
                <div className="rounded">
                  <div
                    className="carousel slide"
                    id="carouselDemo1"
                    data-bs-wrap="true"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {this.state.videoUrls.map((videoUrl, index) => (
                        <div
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          } text-center`}
                          key={index}
                        >
                          <iframe
                            width="70%"
                            height={315}
                            src={videoUrl}
                            title={`Video ${index}`}
                            frameBorder={0}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselDemo1"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselDemo1"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4  ">
                <div className="red-ball bot-50" />
                <div className="red-ball top-50" />

                <h3 className="tcn-1 cursor-scale growDown title-anim mb-3">
                  Others Game
                </h3>
                <div className="row">
                  {this.state.games.map((game, index) => (
                    <div className="tournament-card p-xl-4 p-3 ">
                      <div className="red-ball bot-50" />

                      <div className="tournament-img mb-8 position-relative ">
                        <div className="img-area overflow-hidden">
                          <a href={`/detail-game/${game.id}`}>
                            <img
                              className="w-100 rounded"
                              src={`../assets/img/${game.imageUrls[0]}`}
                              style={{ height: "300px", width: "400px" }}
                            />
                          </a>
                        </div>
                      </div>
                      <div className="tournament-content px-xl-4 px-sm-2 ">
                        <div className="tournament-info mb-5">
                          <a
                            href={`/detail-game/${game.id}`}
                            className="d-block"
                          >
                            <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                              {game.name}
                            </h4>
                          </a>
                        </div>
                        {/* <div className="hr-line line3" /> */}
                        <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                          <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                            <div className="v-line" />
                            <div className="d-flex align-items-center gap-2">
                              <span className="tcn-1 fs-sm">
                                {game.price}{" "}
                                <FontAwesomeIcon icon={faMoneyBill} fade />
                              </span>
                            </div>
                          </div>
                          <div className="date-time bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                            <i className="ti ti-calendar fs-base tcn-1" />
                            <span className="tcn-1 fs-sm">
                              {game.date_released}
                            </span>
                          </div>
                        </div>
                        <div className="hr-line line3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="container-fluid mb-5 mt-5">
                <h4 style={{ color: "#fff" }} className="mb-5 mt-5">
                  Reviews <span>({this.state.countFeedback} reviews)</span>
                </h4>
                <div className="row">
                  <div className="row col-md-10">
                    <div className="col-md-3">
                      <h5>Average</h5>
                      <h2>
                        {this.state.average} {this.starRating(1)}
                      </h2>{" "}
                      <br />
                      <>
                        {/* Button trigger modal */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Send Review
                        </button>
                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            style={{
                              maxWidth: "700px",
                              width: "70%",
                              margin: "0 auto",
                              marginTop: "10%",
                              paddingRight: "0",
                            }}
                            className="modal-dialog"
                          >
                            <div
                              style={{ backgroundColor: "#000" }}
                              className="modal-content"
                            >
                              <div className="modal-header">
                                <button
                                  style={{ backgroundColor: "#FF9900" }}
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body">
                                <StarRating gameId={this.state.gameId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </div>

                    <div className="col-md-9">
                      <div className="row d-flex justify-content-center">
                        <div className="row col-md-12 col-sm-12 align-items-center">
                          <div className=" col-sm-6 col-6 col-lg-4 col-md-4">
                            <div> {this.starRating(5)}</div>
                            <div>
                              {" "}
                              {this.starRating(4)}
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                              {" "}
                              {this.starRating(3)}
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                              {" "}
                              {this.starRating(2)}
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                              {" "}
                              {this.starRating(1)}
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                          </div>
                          <div
                            style={{ padding: 0 }}
                            className="col-md-6 col-sm-5 col-5 col-lg-5"
                          >
                            <div className="progress  mb-2 rounded ">
                              <div
                                className="progress-bar bg-warning "
                                role="progressbar"
                                style={{
                                  width: `${this.calculateStarRatingPercentage(
                                    5
                                  )}%`,
                                }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="progress mb-2 rounded">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                  width: `${this.calculateStarRatingPercentage(
                                    4
                                  )}%`,
                                }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="progress mb-2 rounded">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                  width: `${this.calculateStarRatingPercentage(
                                    3
                                  )}%`,
                                }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="progress mb-1 rounded">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                  width: `${this.calculateStarRatingPercentage(
                                    2
                                  )}%`,
                                }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="progress mt-2 rounded">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                // style={{ width: "75%" }}
                                style={{
                                  width: `${this.calculateStarRatingPercentage(
                                    1
                                  )}%`,
                                }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="col-md-2 col-1 col-sm-1 col-lg-1 text-center">
                            <span>{this.state.feedbackFiveStar}</span> <br />
                            <span>{this.state.feedbackFourStar}</span> <br />
                            <span>{this.state.feedbackThreeStar}</span> <br />
                            <span>{this.state.feedbackTwoStar}</span> <br />
                            <span>{this.state.feedbackOneStar}</span> <br />
                          </div>
                        </div>
                      </div>
                      <p />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-8">
              <FeedbackComponent
                gameId={this.state.gameId}
                feedbacks={this.state.feedbacks}
                replies={this.state.replies}
              />
            </div>
            <div className="red-ball top-50" />
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default DetailProductComponent;
