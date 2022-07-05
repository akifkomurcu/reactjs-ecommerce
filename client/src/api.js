import axios from "axios";

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?_page=${pageParam}&_limit=8`
  );
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    process.env.REACT_APP_BASE_ENDPOINT + `/product/${id}`
  );
  return data;
};
export const PostProduct = async (input) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_ENDPOINT + `/product/`,
    input
  );
  return data;
};
export const fetchAllProduct = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_BASE_ENDPOINT + `/product`
  );
  return data;
};

export const FetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users`,
    input
  );
  return data;
};
export const FetchLogin = async (input) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users?email=${input.email}&password=${input.password}`
  );
  return data;
};

export const PostOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/orders`,
    input
  );
  return data;
};
export const FetchUsers = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users`
  );
  return data;
};
export const FetchOrder = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/orders`
  );
  return data;
};
export const DeletProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`
  );
  return data;
};
export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,
    input
  );
  return data;
};

export const AddWishListAPI = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/wishlist`,
    input
  );
  return data;
};
export const GetToWishList = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/wishlist`
  );
  return data;
};
