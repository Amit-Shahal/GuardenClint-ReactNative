import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

export default function CardHeader(props) {
  const { image, Name } = props;
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: image,
        }}
        size={38}
        containerStyle={{
          shadowRadius: 10,
          shadowColor: "#000000",
        }}
      />
      <Text style={styles.txt}>{Name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txt: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 10,
  },
});
