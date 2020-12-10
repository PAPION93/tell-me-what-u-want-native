import axios from "axios";

const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-type": "application/json",
  };
  const baseUrl = "http://192.168.0.3:10080/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  register: (form) => callApi("post", "/register", form),
  login: (form) => callApi("post", "/login/", form),
  restaurants: (page = 1, token) =>
    callApi("get", `/restaurants/?page=${page}`, null, token),
  favs: (id, token) => callApi("get", `/users/${id}/favs/`, null, token),
  toggleFavs: (userId, roomId, token) =>
    callApi("put", `/users/${userId}/favs/`, { pk: roomId }, token),
  search: (form, token) => callApi("get", "/rooms/search/", null, token, form),
};
