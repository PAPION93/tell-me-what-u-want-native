import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { logIn, logOut } from "../redux/usersSlice";

export default () => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: true,
      }}
    >
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch(logIn("bs.token"))}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
