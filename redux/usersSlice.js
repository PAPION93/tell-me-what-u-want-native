import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setFavs, addLike, delLike } from "./restaurantsSlice";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    id: null,
    name: null,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, name, token },
    } = await api.login(form);
    if (id && name && token) {
      dispatch(logIn({ id, name, token }));
    }
  } catch (e) {
    if (e.response.status == 401) {
      alert("ID 또는 비밀번호를 확인해주세요.");
    }
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();

  try {
    const {
      data: { data },
    } = await api.favs(token);
    dispatch(setFavs(data));
  } catch (e) {
    if (e.response.status == 401) {
      dispatch(logOut());
    }
    console.warn(e.response.status);
  }
};

export const like = (restaurantId) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const { data, status } = await api.like(restaurantId, token);
    dispatch(addLike({ restaurantId }));
  } catch (e) {
    console.warn(e);
  }
};

export const dislike = (restaurantId) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const { data, status } = await api.dislike(restaurantId, token);
    dispatch(delLike({ restaurantId }));
  } catch (e) {
    console.warn(e);
  }
};

export default userSlice.reducer;
