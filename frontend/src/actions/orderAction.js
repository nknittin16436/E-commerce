import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS } from "../constants/orderConstant";
import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) => {
    try {


        dispatch({ type: CREATE_ORDER_REQUEST })
        const { data } = await axios.post(
            `/api/v1/order/new`, order
        );

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}