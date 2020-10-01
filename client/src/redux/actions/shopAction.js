import { ADD_SHIPPING_DATE,  SET_ERROR} from '../types';
import axios from 'axios';

export const addShippingDate = (date)=> (dispatch) =>{
    dispatch({ type: ADD_SHIPPING_DATE,
               payload: date });
  }

  export const paypal = (paymentData)=> (dispatch) =>{
    axios
        .post('/api/order/pay', paymentData)
        .then((res) => {
            if (res.status === 200) {
            console.log(res.data)
            window.location = res.data.forwardLink
            } else {
                dispatch({ type: SET_ERROR });
            }
        })
        .catch((err) => {
            dispatch({ type: SET_ERROR });
        })
  }