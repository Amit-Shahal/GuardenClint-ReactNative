import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { withBadge, Icon } from "react-native-elements";
import getColorForPercentage from "../../Utils/getColorForPercentage";
const BadgedIcon = withBadge(1)(Icon);

export default function GuardenPlant(props) {
  const { area, index } = props;

  if (area.userPlants[index + 1] !== undefined) {
    const platnWaterPercentage =
      area.userPlants[index].LastWateringInMinutes /
      area.userPlants[index].PlantWaterCycleInMinutes;
    const platnWaterPercentageIndexPlus1 =
      area.userPlants[index + 1].LastWateringInMinutes /
      area.userPlants[index + 1].PlantWaterCycleInMinutes;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 85,
          height: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.imgView}
            onPress={() => props.setCase(3, area.userPlants[index])}
          >
            <Image
              source={{
                uri: area.userPlants[index].PlantsPhotoArchive[0].Plant_Photo,
              }}
              style={[
                styles.img,
                {
                  borderColor: getColorForPercentage(1 - platnWaterPercentage),
                },
              ]}
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text>{area.userPlants[index].Plant_Name}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.imgView}
            onPress={() => props.setCase(3, area.userPlants[index + 1])}
          >
            <Image
              source={{
                uri:
                  area.userPlants[index + 1].PlantsPhotoArchive[0].Plant_Photo,
              }}
              style={[
                styles.img,
                {
                  borderColor: getColorForPercentage(
                    1 - platnWaterPercentageIndexPlus1
                  ),
                },
              ]}
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text>{area.userPlants[index + 1].Plant_Name}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    const platnWaterPercentage =
      area.userPlants[index].LastWateringInMinutes /
      area.userPlants[index].PlantWaterCycleInMinutes;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 85,
          height: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.imgView}
            onPress={() => props.setCase(3, area.userPlants[index])}
          >
            <Image
              source={{
                uri: area.userPlants[index].PlantsPhotoArchive[0].Plant_Photo,
              }}
              style={[
                styles.img,
                {
                  borderColor: getColorForPercentage(1 - platnWaterPercentage),
                },
              ]}
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text>{area.userPlants[index].Plant_Name}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.imgView}
            onPress={() => props.setCase(4)}
          >
            <Image
              source={require("../../assets/plus.jpg")}
              style={[styles.img, { borderWidth: 0 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text style={{ opacity: 0.2 }}>Add Plant</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: "80%",

    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#009387",
  },
  imgView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

{
  /* //use badge from react native elements  */
}
{
  /* <BadgedIcon
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
          /> */
}
{
  /* <Badge
            status="primary"
            containerStyle={{
              position: "absolute",
              top: "7.5%",
              right: "7.5%",
            }}
          /> */
}
