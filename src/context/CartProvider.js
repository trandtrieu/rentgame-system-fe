import React, { createContext, useContext } from "react";
import { AuthContext } from "./authContext";
import WishlistServices from "../services/WishlistServices";

const CartContext = createContext();

class CartProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItemCount: 0,
    };
    this.updateWishlistItemCount = this.updateWishlistItemCount.bind(this);
  }
  static contextType = AuthContext;

  async updateWishlistItemCount() {
    try {
      const { accountId, token } = this.context;
      const res = await WishlistServices.countProduct(accountId, token);
      this.setState({ wishlistItemCount: res.data });
    } catch (error) {}
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider
        value={{
          wishlistItemCount: this.state.wishlistItemCount,
          updateWishlistItemCount: this.updateWishlistItemCount,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
export default CartContext;
