import { ADD_TO_CART,REMOVE_CART_ITEM } from "../constants/cartConstant";
import axios from 'axios'


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(
            `/api/v1/product/${id}`
        );

        dispatch({
            type: ADD_TO_CART, payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                stock: data.product.stock,
                image: data.product.images[0].url,
                quantity
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error)
    }
};


export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM, payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};
