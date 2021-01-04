import React, { useState } from "react";
import Pt from "prop-types";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { like, dislike } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RestaurantPhotos from "./RestaurantPhotos";

const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
  position: relative;
`;

const PointContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const PointText = styled.Text`
  padding: 0px 5px;
  margin-right: 10px;
`;

const Navertext = styled.Text`
  color: #00cf5b;
  font-weight: 900;
`;

const DescContainer = styled.View`
  flex-direction: row;
`;

const Desc = styled.Text`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Dot = styled.View`
  padding-top: 5px;
  padding-left: 3px;
  padding-right: 3px;
`;

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 5px;
  top: 5px;
`;

function getIconName(isLiked) {
  const isAndroid = utils.isAndroid();
  if (isAndroid) {
    if (isLiked == 1) {
      return "md-heart";
    }
    return "md-heart-outline";
  } else {
    if (isLiked == 1) {
      return "ios-heart";
    }
    return "ios-heart-outline";
  }
}

const RestaurantCard = ({
  id,
  name,
  category,
  address,
  google_point,
  naver_point,
  dining_point,
  isLiked,
  photos,
  restaurantObj,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Container>
      <TOpacity
        onPress={() => {
          isLiked == 0 ? dispatch(like(id)) : dispatch(dislike(id));
        }}
      >
        <Ionicons
          size={28}
          // name="heart-outline"
          color={isLiked ? colors.red : "white"}
          name={getIconName(isLiked)}
        />
      </TOpacity>
      <RestaurantPhotos photos={photos} />

      <TouchableOpacity
        style={{ alignItems: "flex-start" }}
        onPress={() =>
          navigation.navigate("RestaurantDetail", { ...restaurantObj })
        }
      >
        <PointContainer>
          <Ionicons size={13} color="blue" name="logo-google" />
          <PointText>
            {google_point == "리" ? "리뷰없음" : google_point}
          </PointText>

          <Navertext font-color={colors.green}>N</Navertext>
          <PointText>{naver_point ? naver_point : "리뷰없음"}</PointText>
        </PointContainer>

        <DescContainer>
          <Name>{name}</Name>
          <Dot>
            <Entypo name="dot-single" size={10} color="black" />
          </Dot>
          {category !== "" ? (
            <Desc>{category}</Desc>
          ) : (
            <Desc>대분류>소분류</Desc>
          )}
        </DescContainer>
        {address !== "" ? (
          <Desc>{address}</Desc>
        ) : (
          <Desc>대구광역시 어쩌구 저쩌구 13</Desc>
        )}
      </TouchableOpacity>
    </Container>
  );
};

RestaurantCard.prototype = {
  id: Pt.number.isRequired,
  name: Pt.string.isRequired,
  category: Pt.string.isRequired,
  address: Pt.string.isRequired,
  google_point: Pt.string.isRequired,
  naver_point: Pt.string.isRequired,
  dining_point: Pt.string.isRequired,
  isLiked: Pt.bool.isRequired,
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string,
    })
  ),
  restaurantObj: Pt.objectOf.isRequired,
};

export default RestaurantCard;
