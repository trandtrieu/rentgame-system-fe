import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import WishlistServices from "../services/WishlistServices";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { convertDollarToVND } from "../util/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartProvider";

export default function Notification() {
  const [wishlists, setWishlists] = useState([]);
  useState(false);
  const { accountId, token } = useAuth();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlistItemCount, updateWishlistItemCount } = useCart();

  useEffect(() => {
    updateWishlistItemCount();

    WishlistServices.wishlist(accountId, token)
      .then((res) => {
        setWishlists(res.data);
        console.log("wishlists:" + res.data);
      })
      .catch((error) => {
        console.error("Error loading wishlist:", error);
      });
  }, [accountId, token]);

  const openModal = (productId) => {
    setSelectedProduct(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirmationDelete = async () => {
    if (selectedProduct) {
      await WishlistServices.deleteWishlistProduct(
        accountId,
        selectedProduct,
        token
      )
        .then((response) => {
          WishlistServices.wishlist(accountId, token)
            .then((res) => {
              setWishlists(res.data);
              //   updateWishlistItemCount();
            })
            .catch((error) => {
              console.error(
                "Error loading wishlist after removing product:",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Error removing product from wishlist:", error);
          toast.error("Error removing product from wishlist");
        });
    }
    setSelectedProduct(null);
    setModalIsOpen(false);
  };
  //  const handleAddToCart = async (productId) => {
  //    await addProductToCart(accountId, productId, 1, token);
  //    await updateCartItemCount();
  //  };

  const viewProduct = (productId) => {
    history.push(`/detail-product/${productId}`);
  };
  const toHome = () => history.push(`/home`);

  return (
    <div className="notification-area p-4" data-lenis-prevent="">
      <div className="notification-card d-grid gap-4  " data-tilt="">
        {wishlists.map((wishlistItem) => (
          <div className="d-flex">
            <div
              className="card-item d-flex align-items-center gap-4 m-1"
              key={wishlistItem.id}
            >
              <div className="card-img-area">
                <img
                  className="w-100 rounded-circle"
                  src={`../assets/img/${wishlistItem.imageUrls[0]}`}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {wishlistItem.name}
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  {convertDollarToVND(wishlistItem.price)} per hour
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
