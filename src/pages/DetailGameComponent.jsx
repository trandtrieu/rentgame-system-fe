import React, { Component } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileInvoice,
    faGamepad,
    faHeart,
    faImage,
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

class DetailProductComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   productId: this.props.match.params.productId,
            gameId: 2,

            game: {},
            games: [],
            imageUrls: [],
            categories: [],
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
        // this.deleteFeedback = this.deleteFeedback.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.changeOpinion = this.changeOpinion.bind(this);
        this.changeReply = this.changeReply.bind(this);
        this.postReply = this.postReply.bind(this);
    }
    static contextType = AuthContext;

    componentDidMount() {
        Modal.setAppElement("#root");
        gameServices.getGameById(this.state.gameId)
            .then((res) => {
                const gameData = res.data;
                const imageUrls = gameData.imageUrls || [];
                const categories = gameData.categories || [];
                const videoUrls = gameData.videoUrls || [];
                this.setState({ game: gameData, imageUrls, categories, videoUrls });
                console.log("result: ", this.state.game)
            })
            .catch((error) => {
                // Handle the error here
                console.error("Error fetching game:", error);
                this.props.history.push("/home");
            });

        // ProductServices.get5ProductsRandom()
        //     .then((res) => {
        //         this.setState({ products: res.data });
        //     })
        //     .catch((error) => {
        //         console.error("Lỗi khi tải sản phẩm:", error);
        //     });

        FeedbackServices.getAverageRatingByGameId(this.state.gameId).then(
            (res) => {
                this.setState({ average: res.data });
            }
        );

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

        FeedbackServices.countFeedbackByGameId(this.state.gameId).then(
            (res) => {
                this.setState({
                    countFeedback: res.data,
                });
            }
        );

        FeedbackServices.getFeedbackByGameId(this.state.gameId).then(
            (res) => {
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
            }
        );
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

    handleRatingChange = (e) => {
        const selectedRating = parseInt(e.target.value, 10);
        this.setState({ rating: selectedRating });

        // Cập nhật nội dung của thẻ <p> dựa trên giá trị chọn
        switch (selectedRating) {
            case 1:
                this.setState({ ratingText: "Disappointed" });
                break;
            case 2:
                this.setState({ ratingText: "Dissatisfied" });
                break;
            case 3:
                this.setState({ ratingText: "Normal" });
                break;
            case 4:
                this.setState({ ratingText: "Satisfy" });
                break;
            case 5:
                this.setState({ ratingText: "Excellent" });
                break;
            default:
                this.setState({ ratingText: "Unrated" });
        }
        console.log(selectedRating);
    };

    changeOpinion = (e) => {
        this.setState({ opinion: e.target.value });
        console.log(e.target.value);
    };
    changeReply = (e) => {
        this.setState({ replyByFeedback: e.target.value });
        console.log(e.target.value);
    };
    postFeedback = (e) => {
        e.preventDefault();
        const { accountId, token } = this.context;

        if (this.state.opinion.trim() === "") {
            toast.error("Opinion cannot be empty");
        } else if (this.state.rating < 1 || this.state.rating > 5) {
            toast.error("Rating must be between 1 and 5");
        } else {
            let feedback = {
                comment: this.state.opinion,
                rating: this.state.rating,
            };
            FeedbackServices.addFeedback(
                this.state.gameId,
                accountId,
                feedback,
                token
            ).then((res) => {
                toast.success("Feedback submitted successfully");
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1500);
        }
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
    // handleQuantityChange = (change) => {
    //     // Hàm này cập nhật số lượng dựa trên sự thay đổi (+1 hoặc -1)
    //     this.setState((prevState) => {
    //         const newQuantity = prevState.quantity + change;
    //         return { quantity: newQuantity };
    //     });
    // };
    // handleAddToCart = async (productId, quantity) => {
    //     const { accountId, token } = this.context;
    //     await addProductToCart(accountId, productId, quantity, token);
    //     await window.location.reload();
    // };
    // handleAddtoWishlist = (productId) => {
    //     const { accountId, token } = this.context;
    //     addWishListProduct(accountId, productId, token);
    // };
    // createPrescription = () => {
    //     const { accountId, token } = this.context;

    //     if (accountId && token) {
    //         this.props.history.push(`/create-prescription`);
    //     } else {
    //         this.props.history.push(`/login`);
    //     }
    // };
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
                                    <h3 className="tcn-1 cursor-scale growDown title-anim">Game Name</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-12">
                                <picture>
                                    <img
                                        style={{ height: 300 }}
                                        src={`../assets/img/${this.state.imageUrls[0]}`}
                                        className="img-fluid img-thumbnail w-100 rounded "
                                        alt="..."
                                    />
                                </picture>
                            </div>
                            <div className="col-md-9">
                                <h3 className="mt-sm-4 mt-col-4">{this.state.game.name}</h3>
                                <p className="mt-4 mb-4">
                                    {this.state.game.describe}
                                </p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Date Released: {this.state.game.date_released}</span> <br />
                                        </div>
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Price: {this.state.game.price}</span> <br />
                                        </div>
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Age Limit: {this.state.game.age_limit}</span>
                                        </div>

                                    </div>
                                    <div className="col-md-5">
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Platform: {this.state.game.platform}</span> <br />
                                        </div>
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Stock: {this.state.game.stock}</span> <br />
                                        </div>
                                        <div className="m-5">
                                            <FontAwesomeIcon style={{ fontSize: '20px', marginRight: '5px' }} icon={faGamepad} bounce />
                                            <span> Rating {this.state.game.rating}<FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /></span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-8">
                            <div className="col-12 col-md-8 col-sm-8">
                                <h3>{this.state.game.name}</h3>
                                <p className="mb-5 mt-3">
                                    {this.state.game.note}
                                </p>
                                <h3 className="mb-5"> <FontAwesomeIcon icon={faImage} style={{ color: "#fe501b", marginRight: '10px' }} />Game Screenshot</h3>
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
                                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                        <img
                                                            style={{ height: '400px' }}
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
                                                >
                                                    <img style={{ width: '70px', height: '45px' }} src={`../assets/img/${imageUrl}`} alt={`Slide ${index}`} />
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <h3 style={{ marginTop: 50 }} className="mb-5">
                                    <FontAwesomeIcon icon={faVideo} style={{ color: "#f84b1a", marginRight: '10px' }} />
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
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''} text-center`} key={index}>
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
                            <div className="col-md-4 col-sm-4 col-12">
                                <h3 className="mb-3">Others Game</h3>
                                <div className="row">
                                    <div className="col-12 mb-5">
                                        <div style={{ position: "relative" }}>
                                            <img
                                                src="assets/img/game-xx13.png"
                                                className="img-fluid img-thumbnail  rounded "
                                                alt="..."
                                            />
                                            <h5 style={{ position: "absolute", bottom: 0, left: 10 }}>
                                                God of War Chains of Olympus Việt Hóa (PSP)
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div style={{ position: "relative" }}>
                                            <img
                                                src="assets/img/game-xx13.png"
                                                className="img-fluid img-thumbnail  rounded "
                                                alt="..."
                                            />
                                            <h5 style={{ position: "absolute", bottom: 0, left: 10 }}>
                                                God of War Chains of Olympus Việt Hóa (PSP)
                                            </h5>
                                        </div>
                                    </div>
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
                                            <button
                                                data-toggle="modal"
                                                data-target={`#myModal`}
                                                className="btn btn-info rounded "
                                            >
                                                Send Review
                                            </button>
                                            <p />
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
                    </div>
                </div>
                <Footer />

            </>
        );
    }
}

export default DetailProductComponent;
