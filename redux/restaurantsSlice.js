import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    explore: {
      page: 1,
      restaurants: [],
    },
    favs: [],
  },
  reducers: {
    setExploreRestaurants(state, action) {
      const { explore } = state;
      const { payload } = action;
      if (payload.page === 1) {
        state.explore.restaurants = payload.restaurants;
        state.explore.page = 1;
      } else {
        state.explore.restaurants = [
          ...state.explore.restaurants,
          ...payload.restaurants,
        ];
      }
    },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    setFavs(state, action) {
      state.favs = action.payload;
    },
    setFav(state, action) {
      const {
        payload: { roomId },
      } = action;
      const room = state.explore.restaurants.find((room) => room.id === roomId);
      if (room) {
        if (room.is_fav) {
          room.is_fav = false;
          state.favs = state.favs.filter((room) => room.id !== roomId);
        } else {
          room.is_fav = true;
          state.favs = [room, ...state.favs];
        }
      }
    },
  },
});

export const {
  setExploreRestaurants,
  increasePage,
  setFavs,
  setFav,
} = restaurantsSlice.actions;

export const getRestaurants = (page) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const {
      data: { data },
    } = await api.restaurants(page, token);
    dispatch(
      setExploreRestaurants({
        restaurants: data,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export default restaurantsSlice.reducer;
