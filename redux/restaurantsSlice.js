import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    explore: {
      page: 1,
      restaurants: [],
    },
    search: {
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
        explore.restaurants = payload.restaurants;
        explore.page = 1;
      } else {
        explore.restaurants = [...explore.restaurants, ...payload.restaurants];
      }
    },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    setSearchRestaurants(state, action) {
      const { search } = state;
      const { payload } = action;
      if (payload.page === 1) {
        search.restaurants = payload.restaurants;
        search.page = 1;
      } else {
        search.restaurants = [...search.restaurants, ...payload.restaurants];
      }
    },
    increaseSearchPage(state, action) {
      state.search.page += 1;
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
  setSearchRestaurants,
  increaseSearchPage,
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

export const searchRestaurants = (page, form) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const {
      data: { data },
    } = await api.search(page, form, token);
    dispatch(
      setSearchRestaurants({
        restaurants: data,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export default restaurantsSlice.reducer;
