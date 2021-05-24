import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

import calculatPostDateAndTypeFunc from "../../../Utils/calculatPostDateAndTypeFunc";

export default function CardHeader(props) {
  const { image, Name, Time } = props;
  var now = new Date();
  var dateOfPost = new Date(Time);
  let daysAgo = now.getTime() - dateOfPost.getTime();
  let time = calculatPostDateAndTypeFunc(daysAgo);
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
      <View style={styles.textView}>
        <Text style={styles.txt}>{Name}</Text>
        <Text style={styles.txtTime}>
          {time.time} {time.type} ago
        </Text>
      </View>
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
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  txtTime: {
    fontWeight: "400",
  },
});
