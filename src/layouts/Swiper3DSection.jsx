import React, { useEffect, useState } from "react";
import GamesServices from "../services/GamesServices";
import { convertDollarToVND } from "../util/convert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/CartProvider";
import addWishListGame from "../util/Wishlist";

export default function Swiper3DSection() {
  const [games, setGames] = useState([]);
  const history = useHistory();
  const { accountId, token } = useAuth();
  const { updateWishlistItemCount } = useCart();

  useEffect(() => {
    GamesServices.getListGamesHome()
      .then((res) => {
        setGames(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }, []);
  const handleAddtoWishlist = async (productId) => {
    try {
      await addWishListGame(accountId, productId, token);
      await updateWishlistItemCount();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const viewProduct = (gameId) => {
    history.push(`/detail-game/${gameId}`);
  };

  return (
    <section className="swiper-3d-section position-relative z-1" id="swiper-3d">
      <div className="container">
        <div className="swiper swiper-3d-container">
          <div className="swiper-wrapper">
            {games.map((gamesItems) => (
              <div className="swiper-slide" key={gamesItems.id}>
                <div className="card-3d d-grid justify-content-center p-3">
                  <div className="img-area w-100 mb-8 position-relative">
                    <span className="card-date position-absolute top-0 end-0 py-2 px-3 mt-4 me-5 tcn-1 d-flex align-items-center gap-1 fs-sm">
                      <i className="ti ti-calendar-due text-dark" />{" "}
                      {gamesItems.dateReleased}
                    </span>
                    <img
                      className="w-100"
                      src={`../assets/img/${gamesItems.imageUrls[0]}`}
                      alt="game"
                      style={{ height: "350px" }}
                    />
                    <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                      <span className="dot-icon alt-icon ps-3">Hot</span>
                    </span>
                  </div>
                  <h5
                    className="card-title text-center tcn-1 mb-4 title-anim"
                    onClick={() => viewProduct(gamesItems.id)}
                  >
                    {gamesItems.name}
                  </h5>
                  <div className="d-center">
                    <div className="card-info d-center gap-3 py-1 px-3">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          className="w-100"
                          src="assets/img/bitcoin.png"
                          alt="bitcoin"
                        />
                        <span className="tcn-1 fs-xs">
                          {convertDollarToVND(gamesItems.price)}/hr
                        </span>
                      </div>
                      <div className="v-line" />
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="box-style"
                          onClick={() => handleAddtoWishlist(gamesItems.id)}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="swiper-btn-area d-center gap-6">
          <div className="swiper-btn swiper-3d-button-prev box-style">
            <i className="ti ti-chevron-left fs-xl" />
          </div>
          <div className="swiper-btn swiper-3d-button-next box-style">
            <i className="ti ti-chevron-right fs-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
