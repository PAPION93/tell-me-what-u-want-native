import React from "react";
import styled from "styled-components/native";
import RestaurantCard from "../../../components/RestaurantCard";

const Container = styled.View`
  margin-top: 70px;
  padding: 0px 30px;
`;

const SV = styled.ScrollView``;

const Title = styled.Text`
  font-size: 48px;
  margin-bottom: 10px;
`;

const NoFavs = styled.Text``;

export default ({ restaurants }) => (
  <Container>
    <Title>Favorites ({restaurants.length}) </Title>
    <SV
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {restaurants.length !== 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.key}
            id={restaurant.id}
            name={restaurant.name}
            category={restaurant.category}
            address={restaurant.address}
            google_point={restaurant.google_point}
            naver_point={restaurant.naver_point}
            dining_point={restaurant.dining_point}
            photos={restaurant.images}
            restaurantObj={restaurant.restaurant}
          />
        ))
      ) : (
        <NoFavs>You don't have any favorites</NoFavs>
      )}
    </SV>
  </Container>
);
