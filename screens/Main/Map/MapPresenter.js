import React from "react";
import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import colors from "../../../colors";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  /* background-color: ${colors.red}; */
  position: absolute;
  bottom: 30;
`;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;

const RoomCard = styled.View`
  background-color: white;
  width: ${width - 50}px;
  height: 100px;
  /* margin-right: 20px; */
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

const RoomPhoto = styled.Image`
  width: 100px;
  height: 100%;
  border-radius: 5px;
  margin-right: 20px;
`;

const Column = styled.View`
  width: 70%;
`;

const RoomName = styled.Text`
  font-size: 18px;
`;

const RoomPrice = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const MarkerWrapper = styled.View`
  align-items: center;
`;

const MarkerContainer = styled.View`
  background-color: ${(props) => (props.selected ? "black" : "white")};
  padding: 10px;
  border-radius: 30px;
  position: relative;
`;

const MarkerText = styled.View``;

const MarkerTriangle = styled.View`
  border: 10px solid transparent;
  width: 10px;
  border-top-color: ${(props) => (props.selected ? colors.red : colors.green)};
`;

const RoomMarker = ({ selected, name }) => (
  <MarkerWrapper>
    <MarkerContainer selected={selected}>
      <MarkerText>
        <Ionicons
          size={20}
          name="fast-food-outline"
          color={selected ? "white" : "black"}
        ></Ionicons>
      </MarkerText>
    </MarkerContainer>
  </MarkerWrapper>
);

export default ({
  restaurants,
  mapRef,
  currentIndex,
  onScroll,
  onRegionChangeComplete,
}) => (
  <Container>
    <MapView
      onRegionChangeComplete={onRegionChangeComplete}
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      camera={{
        center: {
          latitude: parseFloat(restaurants[0].lat),
          longitude: parseFloat(restaurants[0].lng),
        },
        altitude: 2000,
        pitch: 0,
        heading: 0,
        zoom: 10,
      }}
    >
      {restaurants?.map((restaurant, index) => (
        <Marker
          key={restaurant.id}
          coordinate={{
            latitude: parseFloat(restaurant.lat),
            longitude: parseFloat(restaurant.lng),
          }}
        >
          <RoomMarker
            selected={index === currentIndex}
            name={restaurant.name}
          />
        </Marker>
      ))}
    </MapView>
    <ScrollView
      scrollEventThrottle={50}
      onScroll={onScroll}
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
    >
      {restaurants?.map((restaurant) => (
        <RoomContainer key={restaurant.id}>
          <RoomCard>
            <RoomPhoto
              source={
                restaurant.images[0]?.file
                  ? { uri: restaurant.images[0]?.file }
                  : require("../../../assets/loginBg.jpeg")
              }
            />
            <Column>
              <RoomName>{restaurant.name}</RoomName>
              <RoomPrice>{restaurant.category}</RoomPrice>
            </Column>
          </RoomCard>
        </RoomContainer>
      ))}
    </ScrollView>
  </Container>
);
