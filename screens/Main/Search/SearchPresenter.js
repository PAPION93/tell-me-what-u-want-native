import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../../../components/DismissKeyboard";
import RestaurantCard from "../../../components/RestaurantCard";
import colors from "../../../colors";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  padding: 0px;
`;

const SearchContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;
const SearchBar = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 15px;
  justify-content: center;
  padding-left: 10px;
`;

const CancleContainer = styled.TouchableOpacity``;

const CancleText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 10px;
`;

const FilterContainer = styled.View`
  align-items: center;
  margin-right: 15px;
`;

const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Filter = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.5);
  width: 80px;
`;

const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ResultsText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const Results = styled.ScrollView`
  padding-top: 10px;
  margin-top: 10px;
`;

const SearchBtn = styled.TouchableOpacity`
  width: 80%;
  padding: 10px;
  margin: 10px 30px;
  border-radius: 10px;
  background-color: ${colors.red};
  align-items: center;
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

export default ({
  navigation,
  name,
  setName,
  searching,
  triggerSearch,
  increasePage,
  results,
}) => (
  <DismissKeyboard>
    <>
      <Container>
        <SearchContainer>
          <SearchBar
            autoFocus={true}
            onChangeText={(name) => setName(name)}
            value={name}
            placeholder="Search By Name..."
          />
          <CancleContainer onPress={() => navigation.goBack()}>
            <CancleText>Cancle</CancleText>
          </CancleContainer>
        </SearchContainer>
        <FiltersContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          {/* <FilterContainer>
            <FilterLabel>Beds</FilterLabel>
            <Filter
              onChangeText={(beds) => setBeds(beds)}
              value={beds}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bedrooms</FilterLabel>
            <Filter
              onChangeText={(bedrooms) => setBedrooms(bedrooms)}
              value={bedrooms}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bathrooms</FilterLabel>
            <Filter
              onChangeText={(bathrooms) => setBathrooms(bathrooms)}
              value={bathrooms}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Max. price</FilterLabel>
            <Filter
              onChangeText={(text) => setMaxPrice(text)}
              value={maxPrice}
              placeholder="$0"
              keyboardType={"number-pad"}
            />
          </FilterContainer> */}
        </FiltersContainer>
      </Container>
      <SearchBtn onPress={searching ? null : triggerSearch}>
        {searching ? (
          <ActivityIndicator color="white" />
        ) : (
          <SearchText>Search</SearchText>
        )}
      </SearchBtn>
      {results ? <ResultsText>총 {results.total}개의 결과</ResultsText> : null}
      <Results contentContainerStyle={{ paddingHorizontal: 15 }}>
        {results?.data?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            category={restaurant.category}
            address={restaurant.address}
            google_point={restaurant.google_point}
            naver_point={restaurant.naver_point}
            dining_point={restaurant.dining_point}
            isLiked={restaurant.likes_count}
            photos={restaurant.images}
            restaurantObj={restaurant}
          />
        ))}
        {results?.next_page_url == null ? null : (
          <TouchableOpacity onPress={increasePage}>
            <LoadMore>
              <LoadMoreText>Load More</LoadMoreText>
            </LoadMore>
          </TouchableOpacity>
        )}
      </Results>
    </>
  </DismissKeyboard>
);
