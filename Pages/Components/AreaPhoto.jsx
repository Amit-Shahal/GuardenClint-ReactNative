import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";

import AddClicks from "../../Utils/AddClicks";

export default function AreaPhoto(props) {
  function AddClicksToArea() {
    AddClicks("Area", props.areaId);
  }

  return (
    <View
      style={{
        justifyContent: "flex-start",
        width: "40%",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.setCase(2);
          AddClicksToArea();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: props.areaPhoto,
          }}
          style={{
            width: "85%",
            height: "90%",
            borderRadius: 30,
            // // borderWidth: 1,
            // borderColor: "#009387",
          }}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <Text>{props.areaName}</Text>
      </View>
    </View>
  );
}
