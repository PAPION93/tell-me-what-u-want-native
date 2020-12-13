import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    name: null,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
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
      data: { name, token },
    } = await api.login(form);
    dispatch(logIn({ name, token }));
    if (name && token) {
      dispatch(logIn({ name, token }));
    }
  } catch (e) {
    if (e.response.status == 401) {
      alert("ID 또는 비밀번호를 확인해주세요.");
    }
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();

  try {
    const data = await api.favs(id, token);
    dispatch(setFavs(data));
  } catch (e) {
    if (e.response.status == 401) {
      dispatch(logOut());
    }
    console.warn(e.response.status);
  }
};

export const toggleFav = (roomId) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  try {
    const { data, status } = await api.toggleFavs(id, roomId, token);
    dispatch(setFav({ roomId }));
  } catch (e) {
    console.warn(e);
  }
};

export default userSlice.reducer;
