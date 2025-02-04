import axios from "axios";

const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-type": "application/json",
  };
  const baseUrl = "http://localhost:10080/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  console.log(fullUrl + " " + method);
  // console.log(params);
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  login: (form) => callApi("post", "/login/", form),
  register: (form) => callApi("post", "/register", form),

  search: (page = 1, form, token) =>
    callApi("get", `/restaurants/?page=${page}`, null, token, form),
  restaurants: (page = 1, token) =>
    callApi("get", `/restaurants/?page=${page}`, null, null),
  restaurantDetail: (restaurantId, token) =>
    callApi("get", `/restaurants/${restaurantId}`, null, null),

  favs: (token) => callApi("get", `/users/me/likes`, null, token),
  like: (restaurantId, token) =>
    callApi("post", `/restaurants/${restaurantId}/likes`, null, token),
  dislike: (restaurantId, token) =>
    callApi("delete", `/restaurants/${restaurantId}/likes`, null, token),
};
