import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Btn from "../../../components/Auth/Btn";
import Input from "../../../components/Auth/Input";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit,
}) => (
  <DismissKeyboard>
    <Container>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position">
        <InputContainer>
          <Input
            value={name}
            placeholder="이름"
            autoCapitalize="words"
            stateFn={setName}
          />
          <Input
            keyboardType={"email-address"}
            value={email}
            placeholder="Email"
            ke
            autoCapitalize="none"
            stateFn={setEmail}
          />
          <Input
            value={password}
            placeholder="비밀번호"
            isPassword={true}
            stateFn={setPassword}
          />
        </InputContainer>
        <Btn
          loading={loading}
          text={"Sign Up"}
          accent
          onPress={handleSubmit}
        ></Btn>
      </KeyboardAvoidingView>
    </Container>
  </DismissKeyboard>
);
