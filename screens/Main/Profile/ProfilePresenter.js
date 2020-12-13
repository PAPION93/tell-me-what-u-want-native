import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../colors";

const Container = styled.View`
  justify-content: center;
`;

const HeaderContainer = styled.View`
  background-color: whitesmoke;
  padding-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 8px;
`;

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const TOContainer = styled.TouchableOpacity`
  padding: 20px 20px;
  border-bottom-width: 1px;
  border-color: ${colors.whiteGray};
`;

const Text = styled.Text`
  font-size: 18px;
`;

export default ({ name, logout }) => (
  <Container>
    <HeaderContainer>
      <Title>Hello, {name}</Title>
    </HeaderContainer>
    <TOContainer onPress={logout}>
      <Text>로그아웃</Text>
    </TOContainer>
  </Container>
);
