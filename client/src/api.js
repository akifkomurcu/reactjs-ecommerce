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
