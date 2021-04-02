import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-elements";

export default function ProfileScreen(props) {
  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Avatar
          rounded
          source={{
            uri: props.userData.ProfileImg,
          }}
          size="xlarge"
          containerStyle={{ marginTop: "5%", borderWidth: 3 }}
        />
        <Text>Hi, this is a gurden profile screen</Text>
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
    borderWidth: 3,
    borderColor: "black",
    borderBottomColor: "#FFFFFF",
  },
});
