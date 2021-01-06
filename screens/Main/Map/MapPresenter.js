import React from "react";
import styled from "styled-components/native";
import { StyleSheet, Dimensions, Button, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../colors";
import utils from "../../../utils";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  /* background-color: ${colors.red}; */
  position: absolute;
  bottom: 30px;
`;

const RestaurantContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;

const RestaurantCard = styled.TouchableOpacity`
  background-color: white;
  width: ${width - 50}px;
  height: 110px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
`;

const RestaurantPhoto = styled.Image`
  width: 100px;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  margin-right: 15px;
`;

const Column = styled.View`
  width: 60%;
`;

const RestaurantName = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const RestaurantCategory = styled.Text`
  font-size: 13px;
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

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  top: 50px;
`;

const MoreBtn = styled.View`
  background-color: white;
  border-radius: 20px;
  height: 35px;
  width: 120px;
  padding: 0px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 1);
`;

const Moretext = styled.Text`
  padding-left: 5px;
  font-size: 15px;
`;

const PointContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const PointText = styled.Text`
  font-size: 11px;
  padding: 0px 5px;
  margin-right: 10px;
`;

const Navertext = styled.Text`
  color: #00cf5b;
  font-weight: 900;
`;

const Kakaotext = styled.Text`
  color: #fee500;
  font-weight: 900;
`;

const RestaurantMarker = ({ selected, name }) => (
  <MarkerWrapper>
    <MarkerContainer selected={selected}>
      <Ionicons
        size={20}
        name="fast-food-outline"
        color={selected ? "white" : "black"}
      ></Ionicons>
    </MarkerContainer>
  </MarkerWrapper>
);

export default ({
  restaurants,
  mapRef,
  currentIndex,
  onScroll,
  onRegionChangeComplete,
  searchThisPlace,
  navigation,
}) => (
  <Container>
    <TOpacity onPress={() => searchThisPlace()}>
      <MoreBtn>
        <Ionicons
          size={15}
          name={utils.isAndroid() ? "md-refresh" : "ios-refresh-outline"}
        ></Ionicons>
        <Moretext>이 지역 검색</Moretext>
      </MoreBtn>
    </TOpacity>
    <MapView
      onRegionChangeComplete={() => onRegionChangeComplete()}
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      camera={{
        center: {
          latitude: parseFloat(
            restaurants.length !== 0 ? restaurants[0].lat : 35.861201
          ),
          longitude: parseFloat(
            restaurants.length !== 0 ? restaurants[0].lng : 128.64586
          ),
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
          <RestaurantMarker
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
        <RestaurantContainer key={restaurant.id}>
          <RestaurantCard
            onPress={() =>
              navigation.navigate("RestaurantDetail", { ...restaurant })
            }
          >
            <RestaurantPhoto
              source={
                restaurant.images[0]?.file
                  ? { uri: restaurant.images[0]?.file }
                  : require("../../../assets/loginBg.jpeg")
              }
            />
            <Column>
              <PointContainer>
                <Ionicons size={11} color={colors.red} name="logo-google" />
                <PointText>
                  {restaurant.google_point == "리"
                    ? "리뷰없음"
                    : restaurant.google_point}
                </PointText>

                <Navertext>N</Navertext>
                <PointText>
                  {restaurant.naver_point ? restaurant.naver_point : "리뷰없음"}
                </PointText>

                <Kakaotext>K</Kakaotext>
                <PointText>
                  {restaurant.kakao_point ? restaurant.kakao_point : "리뷰없음"}
                </PointText>
              </PointContainer>
              <RestaurantName>{restaurant.name}</RestaurantName>
              <RestaurantCategory>{restaurant.category}</RestaurantCategory>
              <RestaurantCategory>{restaurant.address}</RestaurantCategory>
            </Column>
          </RestaurantCard>
        </RestaurantContainer>
      ))}
    </ScrollView>
  </Container>
);
