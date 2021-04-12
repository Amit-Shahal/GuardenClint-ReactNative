import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-elements";

export default function AreaScreen(props) {
  return (
    <Animatable.View
      style={styles.footer}
      animation="bounceInUp"
    >
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
      <Text>Hi, this is a gurden area screen</Text>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 11,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
  },
});
