import React, { useEffect } from "react";
import RestaurantPresenter from "./RestaurantPresenter";

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return <RestaurantPresenter params={params} />;
};
