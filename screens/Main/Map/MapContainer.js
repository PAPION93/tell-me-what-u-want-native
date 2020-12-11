import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import MapPresenter from "./MapPresenter";

const { width, height } = Dimensions.get("screen");

export default ({ restaurants }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;
    const position = Math.abs(Math.floor(x / width));
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
    if (currentIndex !== 0) {
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
    />
  );
};
