import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import MapPresenter from "./MapPresenter";
import { Provider } from "react-redux";

const { width, height } = Dimensions.get("screen");

export default ({
  restaurants,
  searchRestaurants,
  increaseSearchPage,
  page,
  next_page_url,
}) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [northLat, setNorthLat] = useState(35.86123);
  const [southLat, setSouthLat] = useState(35.96123);
  const [eastLng, setEastLng] = useState(128.64581);
  const [westLng, setWestLng] = useState(128.74581);
  const form = {
    ...(northLat && { northLat }),
    ...(southLat && { southLat }),
    ...(eastLng && { eastLng }),
    ...(westLng && { westLng }),
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
      { duration: 100 }
    );
  };

  useEffect(() => {
    if (restaurants.length !== 0) {
      moveMap();
      if (restaurants.length - 1 == currentIndex && next_page_url != null)
        increaseSearchPage();
    }
  }, [currentIndex]);

  const handleRegionChange = async () => {
    try {
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
      var { latitude, longitude } = northEast;
      setNorthLat(latitude);
      setEastLng(longitude);
      var { latitude, longitude } = southWest;
      setSouthLat(latitude);
      setWestLng(longitude);
    } catch (e) {
      console.warn(e);
    }
  };

  const searchThisPlace = () => {
    setCurrentIndex(0);
    searchRestaurants(1, form);
  };

  return (
    <MapPresenter
      restaurants={restaurants}
      mapRef={mapRef}
      currentIndex={currentIndex}
      onScroll={onScroll}
      onRegionChangeComplete={handleRegionChange}
      searchThisPlace={searchThisPlace}
    />
  );
};
