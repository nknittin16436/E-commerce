import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item ,deleteItemFromCart}) => {
  return <div className="CartItemCard">
    <img src={item.image} alt="sa" />
    <div>
        <Link to={`/product/${item.product}`} >{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={()=>deleteItemFromCart(item.product)}>remove</p>
    </div>
  </div>;
};

export default CartItemCard;
