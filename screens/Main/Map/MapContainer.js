import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import MapPresenter from "./MapPresenter";

const { width, height } = Dimensions.get("screen");

export default ({
  restaurants,
  searchRestaurants,
  page,
  increaseSearchPage,
}) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lat, setLat] = useState(35.86123);
  const [lng, setLng] = useState(128.64581);
  const form = {
    ...(lat && { lat }),
    ...(lng && { lng }),
  };

  useEffect(() => {
    searchRestaurants(1, form);
  }, []);

  useEffect(() => {
    searchRestaurants(page, form);
  }, [page]);

  const onScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;
    const position = Math.floor(x / width);
    if (position < 0) return false;
    setCurrentIndex(position);
  };

  const moveMap = () => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(restaurants[currentIndex].lat),
          longitude: parseFloat(restaurants[currentIndex].lng),
        },
      },
      { duration: 500 }
    );
  };

  useEffect(() => {
    if (restaurants.length !== 0) {
      moveMap();
    }
  }, [currentIndex]);

  const handleRegionChange = async () => {
    try {
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <MapPresenter
      restaurants={restaurants}
      mapRef={mapRef}
      currentIndex={currentIndex}
      onScroll={onScroll}
      onRegionChangeComplete={handleRegionChange}
      increaseSearchPage={increaseSearchPage}
    />
  );
};
