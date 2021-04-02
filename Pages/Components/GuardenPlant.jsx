import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withBadge, Icon } from "react-native-elements";
const BadgedIcon = withBadge(1)(Icon);

export default function GuardenPlant(props) {
  const { area, index } = props;
  if (area.userPlants[index + 1] !== undefined) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.imgView}
          onPress={() => props.setCase(3)}
        >
          <Image
            source={{
              uri: area.userPlants[index].PlantsPhotoArchive[0].Plant_Photo,
            }}
            style={styles.img}
          />
          {/* //use badge from react native elements  */}
          {/* <BadgedIcon
            type="ionicon"
            name="water-outline"
            color="red"
            containerStyle={{
              position: "absolute",
              // top: "7.5%",
              left: "7.5%",
            }}
          />
          <BadgedIcon
            type="Entypo"
            name="new"
            containerStyle={{
              position: "absolute",
              // top: "7.5%",
              left: "7.5%",
            }}
          /> */}
          {/* <Badge
            status="primary"
            containerStyle={{
              position: "absolute",
              top: "7.5%",
              right: "7.5%",
            }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imgView}
          onPress={() => props.setCase(3)}
        >
          <Image
            source={{
              uri: area.userPlants[index + 1].PlantsPhotoArchive[0].Plant_Photo,
            }}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        key={index}
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => props.setCase(3)}
          style={{
            width: "95%",
            height: "50%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: area.userPlants[index].PlantsPhotoArchive[0].Plant_Photo,
            }}
            style={{
              width: "100%",
              height: "92.5%",
              marginTop: "5%",

              borderRadius: 30,
              borderWidth: 3,
              borderColor: "#009387",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setCase(4)}
          style={{
            width: "95%",
            height: "50%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/plus.jpg")}
            style={{
              width: "100%",
              height: "92.5%",
              marginTop: "5%",

              borderRadius: 30,
              // borderWidth: 3,
              // borderColor: "#009387",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "92.5%",
    marginBottom: "2.5%",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#009387",
  },
  imgView: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "50%",
  },
});
