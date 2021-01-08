import React, { useEffect, useState } from "react";
import RestaurantPresenter from "./RestaurantPresenter";
import api from "../../../api";

export default ({ route: { params }, navigation }) => {
  const [naverBlogs, setNaverBlogs] = useState([]);
  const getRestaurant = async () => {
    const {
      data: { naver_blogs },
    } = await api.restaurantDetail(params.id, null);

    setNaverBlogs(naver_blogs);
  };
  useEffect(() => {
    getRestaurant();

    navigation.setOptions({ title: params.name });
  }, []);

  return <RestaurantPresenter params={params} naverBlogs={naverBlogs} />;
};
