import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-elements";
import { useGardenData } from "../../../Utils/UserGardenDataContext";
export default function ProfileScreen(props) {
  const GardenData = useGardenData();
  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Avatar
          rounded
          source={{
            uri: GardenData.ProfileImg,
          }}
          size="xlarge"
          containerStyle={{ marginTop: "5%", borderWidth: 3 }}
        />
        <Text styles={styles.title}>{GardenData.Name}</Text>
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
  title: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
});
