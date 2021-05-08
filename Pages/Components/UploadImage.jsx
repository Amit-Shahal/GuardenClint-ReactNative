import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage() {
  const [image, setImage] = useState("../../assets/vase.jpg");

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const captureImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Add Plant New Image",
      null,
      [
        {
          text: "Capture Image",
          onPress: captureImage,
        },
        {
          text: "Pick Image",
          onPress: pickImage,
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableOpacity
        onPress={showAlert}
        style={{
          height: "100%",
          width: "45%",
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: "#009387",
          backgroundColor: "#EDEDE6",
          alignItems: "center",
          justifyContent: "flex-start",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "85%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Add photo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    height: "100%",
    width: "45%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#009387",
    backgroundColor: "#EDEDE6",

    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  img: {
    width: "100%",
    height: "85%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
