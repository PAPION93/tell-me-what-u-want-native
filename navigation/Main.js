import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import utils from "../utils";
import colors from "../colors";
import BackBtn from "../components/Auth/BackBtn";
import MapScreen from "../screens/Main/Map";
import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import Profile from "../screens/Main/Profile";
// import Room from "../screens/Main/Room";
// import Search from "../screens/Main/Search";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => (
  <TabsNavigator.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      tabStyle: {
        paddingTop: 10,
      },
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600",
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const isAndroid = utils.isAndroid();
        let iconName = `${isAndroid ? "md-" : "ios-"}`;
        if (route.name === "검색") {
          iconName += "search";
        } else if (route.name === "저장 목록") {
          iconName += "heart";
        } else if (route.name === "지도") {
          iconName += "map";
        } else if (route.name === "프로필") {
          iconName += "person";
        }
        return (
          <Ionicons
            name={iconName}
            size={24}
            color={focused ? colors.red : "grey"}
          />
        );
      },
    })}
  >
    <TabsNavigator.Screen name="검색" component={Explore} />
    <TabsNavigator.Screen name="지도" component={MapScreen} />
    <TabsNavigator.Screen name="저장 목록" component={Saved} />
    <TabsNavigator.Screen name="프로필" component={Profile} />
  </TabsNavigator.Navigator>
);

const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator
    mode="modal"
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}
  >
    <MainNavigator.Screen
      name="tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    {/* <MainNavigator.Screen
      name="RoomDetail"
      component={Room}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={100}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
    <MainNavigator.Screen
      name="Search"
      options={{ headerShown: false }}
      component={Search}
    /> */}
  </MainNavigator.Navigator>
);
