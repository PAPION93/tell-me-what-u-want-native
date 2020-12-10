import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Pt from "prop-types";
import Swiper from "react-native-web-swiper";

const { width, height } = Dimensions.get("screen");

const PhotoContainer = styled.View`
  overflow: hidden;
  margin-bottom: 10px;
  width: 100%;
  height: ${(props) => `${height / props.factor}`}px;
`;

const SlideImage = styled.Image`
  border-radius: 15px;
  width: 100%;
  height: 100%;
`;

const RoomPhotos = ({ photos, factor = 4 }) => (
  <PhotoContainer factor={factor}>
    {photos.length === 0 ? (
      <SlideImage
        resizeMode="cover"
        source={require("../assets/loginBg.jpeg")}
      />
    ) : (
      <Swiper
        controlsProps={{
          PrevComponent: () => null,
          NextComponent: () => null,
          dotActiveStyle: {
            backgroundColor: "white",
          },
        }}
      >
        {photos.map((photo) => (
          <SlideImage key={photo.id} source={{ uri: photo.file }} />
        ))}
      </Swiper>
    )}
  </PhotoContainer>
);

RoomPhotos.propTypes = {
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string,
    })
  ),
};

export default RoomPhotos;
