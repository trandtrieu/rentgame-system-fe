import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrownOpen, faFaceGrinSquint, faFaceSmile, faHeartCrack, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import FeedbackServices from '../services/FeedbackServices';

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: props.gameId,
            rating: null,
            hover: null,
            opinion: ''
        };
        this.changeOpinion = this.changeOpinion.bind(this);

    }
    changeOpinion = (e) => {
        this.setState({ opinion: e.target.value });
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
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    getStatus = () => {
        const { rating } = this.state;
        if (rating === 1) return {
            status: "Disappointed", icon: <FontAwesomeIcon color='#FF6666' icon={faHeartCrack} shake />
        };
        if (rating === 2) return {
            status: "Dissatisfied", icon: <FontAwesomeIcon color='	
        #339966' icon={faFaceFrownOpen} shake />
        };
        if (rating === 3) return { status: "Normal", icon: <FontAwesomeIcon color='#3399FF' icon={faThumbsUp} shake /> };
        if (rating === 4) return { status: "Satisfy", icon: <FontAwesomeIcon color='#FFCC66' icon={faFaceSmile} shake /> };
        if (rating === 5) return { status: "Excellent", icon: <FontAwesomeIcon icon={faFaceGrinSquint} shake /> };
        return { status: "Unrated", icon: null };
    };

    render() {
        const { rating, hover } = this.state;
        return (

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                        <label key={i}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => this.setState({ rating: ratingValue })}
                            />
                            <FaStar
                                className="star m-1"
                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                size={40}
                                onMouseEnter={() => this.setState({ hover: ratingValue })}
                                onMouseLeave={() => this.setState({ hover: null })}
                            />
                        </label>
                    );
                })}

                <span > {rating === null ? (<h2 style={{ margin: '20px' }}> </h2>) : (<h2 style={{ margin: '20px' }}>{this.getStatus().status} <span style={{ margin: '0 5px' }}></span> {this.getStatus().icon}</h2>)}</span>
                <textarea onChange={this.changeOpinion} style={{ outline: 'none' }} className='rounded w-100' placeholder='Type your reply' name="" id="" cols="60" rows="5"></textarea>
                <div className="modal-footer">
                    <button onClick={this.postFeedback} type="button" className="btn btn-primary">
                        Post
                    </button>
                </div>
            </div>
        );
    }
}

export default StarRating;
