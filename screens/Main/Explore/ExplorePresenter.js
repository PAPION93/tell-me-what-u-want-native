import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import RestaurantCard from "../../../components/RestaurantCard";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 15px;
`;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  margin: 80px 0px 10px 0px;
  border-radius: 15px;
  justify-content: center;
  padding-left: 10px;
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  width: 100%;
  padding: 10px 10px;
  align-items: center;
  background-color: #006a70;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const LoadMoreText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

export default ({ restaurants, increasePage }) => {
  const navigation = useNavigation();
  return (
    <Container>
      {restaurants.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Search")}
          >
            <FakeBar>
              <FakeText>search</FakeText>
            </FakeBar>
          </TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingTop: 30 }}
          >
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                category={restaurant.category}
                address={restaurant.address}
                google_point={restaurant.google_point}
                naver_point={restaurant.naver_point}
                dining_point={restaurant.dining_point}
                photos={restaurant.images}
                restaurantObj={restaurant}
              />
            ))}
            <TouchableOpacity onPress={increasePage}>
              <LoadMore>
                <LoadMoreText>Load More</LoadMoreText>
              </LoadMore>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Container>
  );
};
