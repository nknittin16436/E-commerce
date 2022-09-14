import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart ,removeItemsFromCart} from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if(stock<=quantity){
        return;
    }
    dispatch(addItemsToCart(id,newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if(1>=quantity){
        return;
    }
    dispatch(addItemsToCart(id,newQty));
  };

  const deleteItemFromCart=(id)=>{
    dispatch(removeItemsFromCart(id));
  }

  return (
   <Fragment>
    {cartItems.length===0?
    <div className="emptyCart">
        <RemoveShoppingCartIcon/>
        <Typography>No items in Cart</Typography>
        <Link to="/products">view products</Link>
    </div>
    :
    <Fragment>
    <div className="cartPage">
      <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Sub Total</p>
      </div>
      {cartItems &&
        cartItems.map((item) => (
          <div className="cartContainer" key={item.product}>
            <CartItemCard item={item} deleteItemFromCart={deleteItemFromCart} />
            <div className="cartInput">
              <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
              <span style={{ margin: "auto 10px" }}>{item.quantity}</span>
              <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
            </div>
            <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
          </div>
        ))}

      <div className="cartGrossTotal">
        <div></div>
        <div className="cartGrossTotalBox">
          <p>Gross Total</p>
          <p>{`₹600`}</p>
        </div>
        <div></div>
        <div className="checkOutBtn">
          <button>Check Out</button>
        </div>
      </div>
    </div>
  </Fragment>
}
   </Fragment>
  );
};

export default Cart;
