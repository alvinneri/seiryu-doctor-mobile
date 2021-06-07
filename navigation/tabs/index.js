import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Home from "../stack/home";
import Settings from "../stack/settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const MainTab = createBottomTabNavigator();

export default (props) => {
  const { user } = useSelector((state) => state.public);

  return (
    <MainTab.Navigator
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName;
          switch (route.name) {
            case "Home":
              routeName = "Home";
              iconName = "home";
              break;
            case "Settings":
              routeName = "Settings";
              iconName = "cog-outline";
              break;
          }

          return (
            <>
              <Icon
                name={iconName}
                size={25}
                color={focused ? "blue" : "black"}
              />
              <Text
                style={{
                  fontSize: wp("3%"),
                  color: focused ? "blue" : "black",
                }}
              >
                {routeName}
              </Text>
            </>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        inactiveBackgroundColor: "#ffffff",
        activeBackgroundColor: "#D1EEFE",
        activeTintColor: "#ffffff",
        inactiveTintColor: "#D1EEFE",
        keyboardHidesTabBar: true,
      }}
    >
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Settings" component={Settings} />
    </MainTab.Navigator>
  );
};
