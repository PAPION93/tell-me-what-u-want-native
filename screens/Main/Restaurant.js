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
  font-size: 24px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;

const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
`;

const CheckContainer = styled.View`
  margin-top: 40px;
`;

const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckTitle = styled.Text`
  font-size: 18px;
  margin-left: 15px;
`;

const CheckTime = styled.Text`
  margin-top: 10px;
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
        <Address>{params.address}</Address>
        <PropertyInfoContainer>
          <PropertyInfoData>
            <PropertyInfoText>{formatQtt(params.name, "bed")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQtt(params.name, "bedroom")}
            </PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQtt(params.name, "bathroom")}
            </PropertyInfoText>
          </PropertyInfoData>
        </PropertyInfoContainer>
        <CheckContainer>
          <CheckTitleContainer>
            <Ionicons
              name={utils.isAndroid ? "md-timer" : "ios-timer"}
              size={24}
            ></Ionicons>
            <CheckTitle>Check-in / Check-out</CheckTitle>
          </CheckTitleContainer>
          <CheckTime>{params.name}</CheckTime>
        </CheckContainer>
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
