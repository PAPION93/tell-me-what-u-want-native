import React from "react";
import styled from "styled-components/native";
import { ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import RestaurantPhotos from "../../../components/RestaurantPhotos";
import colors from "../../../colors";
import Moment from "moment";

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

const BlogContainer = styled.View`
  padding: 10px 0px 10px 0px;
  background-color: transparent;
  align-items: center;
`;

const BlogCard = styled.TouchableOpacity`
  border: 1px solid ${colors.whiteGray};
  align-items: center;
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
`;

const BlogName = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const BlogCategory = styled.Text`
  font-size: 13px;
  margin-top: 5px;
`;

const FakeBar = styled.View`
  justify-content: center;
  height: 40px;
  margin-top: 20px;
  padding-left: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${colors.naver};
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 800;
  color: white;
`;

export default ({ params, naverBlogs }) => (
  <Container>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: "100%" }}
      contentContainerStyle={{ paddingTop: 30 }}
    >
      <RestaurantPhotos photos={params.images} factor={2} />
      <DataContainer>
        <PointContainer>
          <Ionicons size={15} color={"#1a0dab"} name="logo-google" />
          <PointText>
            {params.google_point == "리" ? "리뷰없음" : params.google_point}
          </PointText>

          <Navertext font-color={colors.naver}>N</Navertext>
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

        <FakeBar>
          <FakeText>네이버 블로그({naverBlogs.total})</FakeText>
        </FakeBar>
        {naverBlogs?.items?.map((item) => (
          <BlogContainer key={item.id}>
            <BlogCard onPress={() => Linking.openURL(`${item.link}`)}>
              <BlogName>{item.title}</BlogName>
              <BlogCategory>{item.description}</BlogCategory>
              <BlogCategory>
                {item.postdate} | {item.bloggername}
              </BlogCategory>
            </BlogCard>
          </BlogContainer>
        ))}
      </DataContainer>
    </ScrollView>
  </Container>
);
