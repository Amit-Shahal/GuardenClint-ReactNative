import React from "react";
import { View, Text, Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function settings({ navigation }) {
  const NavigateToSplashScreen =async () => {
    AsyncStorage.removeItem("user");
    navigation.popToTop()
  };

  return (
    <View style= {{marginTop:50}}>
      <Text>settings</Text>
      <Button title="Log Out"
       onPress={NavigateToSplashScreen}
        />
    </View>
  );
}
