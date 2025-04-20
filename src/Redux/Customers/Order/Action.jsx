import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,


  // GET_ORDER_HISTORY_FAILURE,
  // GET_ORDER_HISTORY_REQUEST,
  // GET_ORDER_HISTORY_SUCCESS,


} from "./ActionType";

import api from "../../../config/api";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("create order req first ", reqData);
  dispatch({ type: CREATE_ORDER_REQUEST });
  console.log("create order req second ", reqData);

  try {
  
    console.log("create order req --------", reqData);
    const { data } = await api.post(
      `/api/orders`,
      reqData.address,
    );

    console.log("create order req data", data);  

    
    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
    }

    console.log("order data ", data);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("here is the issue ", error);
    console.log("catch error : ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {

    const { data } = await api.get(
      `/api/orders/${orderId}`,
      
    );
    console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:error.message
        
    });
  }
};

// export const getOrderHistory = (reqData) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: GET_ORDER_HISTORY_REQUEST });

//     const config = {
//       headers: {
//         Authorization: `Bearer ${reqData.jwt}`,
//       },
//     };

//     const { data } = await api.get(`/api/orders/user`);
//     console.log("order history -------- ", data);
//     dispatch({
//       type: GET_ORDER_HISTORY_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ORDER_HISTORY_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
