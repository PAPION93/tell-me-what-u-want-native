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
    addLike(state, action) {
      const {
        payload: { restaurantId },
      } = action;
      const restaurant = state.explore.restaurants.find(
        (restaurant) => restaurant.id === restaurantId
      );
      if (restaurant) {
        restaurant.likes_count = true;
        state.favs = [restaurant, ...state.favs];
      }
    },
    delLike(state, action) {
      const {
        payload: { restaurantId },
      } = action;
      const restaurant = state.explore.restaurants.find(
        (restaurant) => restaurant.id === restaurantId
      );
      if (restaurant) {
        restaurant.likes_count = false;
        state.favs = state.favs.filter(
          (restaurant) => restaurant.id !== restaurantId
        );
      }
    },
  },
});

export const {
  setExploreRestaurants,
  increasePage,
  setFavs,
  addLike,
  delLike,
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
