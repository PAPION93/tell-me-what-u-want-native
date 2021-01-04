import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import RestaurantPhotos from "../../../components/RestaurantPhotos";
import colors from "../../../colors";
import { Text } from "react-native";

const Container = styled.View``;

const DataContainer = styled.View`
  padding: 0px 20px;
`;
const Address = styled.Text`
  margin-top: 10px;
  font-size: 20px;
`;

const Category = styled.Text`
  margin-top: 10px;
  font-size: 18px;
`;

const PointContainer = styled.View`
  flex-direction: row;
  text-align: center;
  margin-bottom: 5px;
`;

const Navertext = styled.Text`
  color: #00cf5b;
  font-size: 16px;
  font-weight: 900;
`;

const PointText = styled.Text`
  padding: 0px 5px;
  font-size: 15px;
  margin-right: 10px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 30px;
`;

export default ({ params, naverBlogs }) => (
  <Container>
    <RestaurantPhotos photos={params.images} factor={2} />
    <DataContainer>
      <PointContainer>
        <Ionicons size={15} color={"#1a0dab"} name="logo-google" />
        <PointText>
          {params.google_point == "리" ? "리뷰없음" : params.google_point}
        </PointText>

        <Navertext font-color={colors.green}>N</Navertext>
        <PointText>
          {params.naver_point ? params.naver_point : "리뷰없음"}
        </PointText>
      </PointContainer>
      <Address>{params.category}</Address>
      <Category>{params.address}</Category>
      <MapContainer>
        <MapView
          camera={{
            center: {
              latitude: parseFloat(params.lat),
              longitude: parseFloat(params.lng),
            },
            altitude: 10 * 200,
            pitch: 15,
            heading: 0,
            zoom: 10,
          }}
          zoomEnabled={false}
          scrollEnabled={false}
          style={{ height: "100%", width: "100%" }}
        >
          <Marker
            coordinate={{
              longitude: parseFloat(params.lng),
              latitude: parseFloat(params.lat),
            }}
          />
        </MapView>
        <Text> 블로그 개수 : {naverBlogs.total}</Text>
      </MapContainer>
    </DataContainer>
  </Container>
);
