import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

export default function ProfileAvatar(props) {
  return (
    <TouchableOpacity onPress={() => props.setCase(1)}>
      <Avatar
        rounded
        source={{
          uri: props.ProfileImg,
        }}
        size="medium"
        containerStyle={{
          marginBottom: 2,
          shadowRadius: 10,
          shadowColor: "#000000",
        }}
      />
    </TouchableOpacity>
  );
}
