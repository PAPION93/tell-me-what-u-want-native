import React, { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

export default ({
  getRestaurants,
  restaurants,
  page,
  increasePage,
  navigation,
}) => {
  useEffect(() => {
    getRestaurants(1);
  }, []);
  useEffect(() => {
    getRestaurants(page);
  }, [page]);
  return (
    <ExplorePresenter restaurants={restaurants} increasePage={increasePage} />
  );
};
