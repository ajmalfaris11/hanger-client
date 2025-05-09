import axios from "axios";

import {
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

export const findProducts = (reqData) => async (dispatch) => {
  const {
    colors = [],
    sizes = [],
    minPrice = 0,
    maxPrice = 10000,
    minDiscount = 0,
    category = "",
    stock = null,
    sort = "price_low",
    pageNumber = 0,
    pageSize = 10,
  } = reqData;
  console.log("color======", colors)
  try {
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });

    // Construct query parameters dynamically
    const queryParams = new URLSearchParams();
    if (colors.length > 0) queryParams.append("color", colors);
    if (sizes.length > 0) queryParams.append("size", sizes); // Ensure this matches backend
    if (minPrice > 0) queryParams.append("minPrice", minPrice);
    if (maxPrice > 0) queryParams.append("maxPrice", maxPrice);
    if (minDiscount > 0) queryParams.append("minDiscount", minDiscount);
    if (category) queryParams.append("category", category);
    if (stock !== null && stock !== undefined) queryParams.append("stock", stock);
    if (sort) queryParams.append("sort", sort);
    if (pageNumber >= 0) queryParams.append("pageNumber", pageNumber);
    if (pageSize > 0) queryParams.append("pageSize", pageSize);

    console.log("Query Params:", queryParams.toString());

    // Make the API call
    const { data } = await api.get(`/api/products?${queryParams.toString()}`); 
    console.log("Fetched products:", data);

    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching products:", error.response || error);

    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const{productId}=reqData;

  console.log("find product by id action", reqData)

  try {

    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("find product by id action data", data) 

    console.log("products by  id : ", data);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${product.productId}`,
      product
    );
    console.log("update product ", data)
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action", productId);
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await api.delete(`/api/admin/products/${productId}`);

    console.log("delete product ", data);

    // Dispatch success action
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId, // Pass the productId to update the state
    });

    console.log("product deleted successfully", data);
  } catch (error) { // Add the error parameter here
    console.log("catch error ", error); // Logs the error
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
