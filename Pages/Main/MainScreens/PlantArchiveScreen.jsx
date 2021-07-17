import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import CarouselPhotos from "../../Components/CarouselPhotos";

export default function PlantArchiveScreen(props) {
  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <CarouselPhotos
          PlantsPhotoArchive={props.PlantsPhotoArchive}
        ></CarouselPhotos>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 19,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
