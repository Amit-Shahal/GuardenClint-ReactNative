import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CardBody(props) {
  const { image, text } = props;
  return (
    <View style={styles.container}>
      <View style={styles.txtView}>
        <Text style={styles.txt}>{text}</Text>
      </View>
      {image !== null && (
        <Image
          source={{
            uri: image,
          }}
          style={styles.img}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 24,
    fontWeight: "600",
  },
  txtView: {
    flex: 3,
    height: 95,
    marginTop: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  img: {
    flex: 2,
    height: 100,
    borderRadius: 20,
  },
});
