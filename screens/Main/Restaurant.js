import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import RestaurantPhotos from "../../components/RestaurantPhotos";
import colors from "../../colors";
import utils from "../../utils";

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

function formatQtt(number, name) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

function formatTime(time) {
  const [hours, min, sec] = time.split(":");
  return `${hours} o'clock`;
}

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
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
        </MapContainer>
      </DataContainer>
    </Container>
  );
};
