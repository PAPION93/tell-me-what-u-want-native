import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
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
      data: { access_token },
    } = await api.login(form);
    if (access_token) {
      dispatch(logIn({ access_token }));
    }
    alert(access_token);
  } catch (e) {
    alert(e);
    // alert("Wrong user/password");
  }
};

export default userSlice.reducer;
