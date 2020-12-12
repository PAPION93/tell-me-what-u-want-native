import React from "react";
import Pt from "prop-types";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import RoomPhotos from "./RoomPhotos";
import { Text } from "react-native";

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
  padding-horizontal: 3px;
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

const FavButton = styled.View`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
`;

function getIconName(isFav) {
  const isAndroid = utils.isAndroid();
  if (isAndroid) {
    if (isFav) {
      return "md-heart";
    }
    return "md-heart-empty";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-empty";
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
  photos,
  restaurantObj,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Container>
      <TOpacity onPress={() => dispatch(toggleFav(id))}>
        <FavButton>
          <Ionicons
            size={28}
            name="heart"
            // color={isFav ? colors.red : "black"}
            // name={getIconName(isFav)}
          />
        </FavButton>
      </TOpacity>
      <RoomPhotos photos={photos} />

      <TouchableOpacity
        style={{ alignItems: "flex-start" }}
        onPress={() => navigation.navigate("RoomDetail", { ...restaurantObj })}
      >
        <PointContainer>
          <Ionicons
            size={13}
            color={colors.red}
            name="logo-google"
            // name={getIconName(isFav)}
          />
          <PointText>{google_point}</PointText>
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
  isFav: Pt.bool.isRequired,
  isSuperHost: Pt.bool.isRequired,
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string,
    })
  ),
  name: Pt.string.isRequired,
  price: Pt.number.isRequired,
  roomObj: Pt.objectOf.isRequired,
};

export default RestaurantCard;
