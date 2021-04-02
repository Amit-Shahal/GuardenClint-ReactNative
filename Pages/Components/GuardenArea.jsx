import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

export default function GuardenArea(props) {
  const { Area_Photo } = props.Area.AreasPhotoArchive[0];

  return (
    <TouchableOpacity
      onPress={() => props.setCase(2)}
      style={{
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: Area_Photo,
        }}
        style={{
          width: "95%",
          height: "95%",
          borderRadius: 30,
          borderWidth: 3,
          borderColor: "#009387",
        }}
      />
    </TouchableOpacity>
  );
}
