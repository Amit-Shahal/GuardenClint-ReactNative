import React from "react";
import GardenDataProvider from "../Utils/UserGardenDataContext";

import main from "../Pages/Main/main";
import forum from "../Pages/Main/forum";
import settings from "../Pages/Main/settings";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function mainStack() {
  const Tab = createBottomTabNavigator();
  return (
    <GardenDataProvider>
      <Tab.Navigator initialRouteName="main">
        <Tab.Screen
          name="settings"
          component={settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-settings"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="main"
          component={main}
          options={{
            tabBarLabel: "My Guarden",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="flower-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="forum"
          component={forum}
          options={{
            tabBarLabel: "Forum",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="forum" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </GardenDataProvider>
  );
}
