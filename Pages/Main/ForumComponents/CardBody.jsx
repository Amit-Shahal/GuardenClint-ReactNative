import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export default function CardBody(props) {
  const { image, text, Question_ID } = props;
  return (
    <View style={styles.container}>
      <View style={styles.txtView}>
        <SharedElement id={`item.${Question_ID}.txt`}>
          <Text style={styles.txt} numberOfLines={3} adjustsFontSizeToFit>
            {text}
          </Text>
        </SharedElement>
      </View>
      {/* <SharedElement id={`item.${Question_ID}.img`} style={styles.imgView}> */}
      <Image
        source={{
          uri: image,
        }}
        // style={{ flex: 1, borderRadius: 20 }}
        style={styles.imgView}
      />
      {/* </SharedElement> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
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
  imgView: {
    flex: 2,
    height: 100,
  },
});
