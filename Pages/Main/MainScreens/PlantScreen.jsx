import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import getColorForPercentage from "../../../Utils/getColorForPercentage";
import { Avatar } from "react-native-elements";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PlantScreen(props) {
  const plant = props.plantPreesed;
  const [color, setcolor] = useState(getColorForPercentage(1));
  const [emoji, setemoji] = useState("emoji-flirt");
  const [plantNextWateringInDays, setplantNextWateringInDays] = useState(0);

  var platnWaterPercentage =
    plant.LastWateringInMinutes / plant.PlantWaterCycleInMinutes;

  var PlantWaterCycleInDays = Math.round(plant.PlantWaterCycleInMinutes / 1440);

  useEffect(() => {
    setcolor(getColorForPercentage(1 - platnWaterPercentage));

    if (1 - platnWaterPercentage <= 0.25) setemoji("emoji-sad");
    if (1 - platnWaterPercentage >= 0.25 && 1 - platnWaterPercentage <= 0.5)
      setemoji("emoji-neutral");
    if (1 - platnWaterPercentage >= 0.5 && 1 - platnWaterPercentage <= 0.75)
      setemoji("emoji-happy");
    let temp = Math.round(
      (plant.PlantWaterCycleInMinutes - plant.LastWateringInMinutes) / 1440
    );
    temp <= 0
      ? setplantNextWateringInDays(0)
      : setplantNextWateringInDays(temp);
  }, []);

  const WaterPlant = () => {
    setcolor(getColorForPercentage(1));
    setemoji("emoji-flirt");
    setplantNextWateringInDays(PlantWaterCycleInDays);

    let url = "http://proj.ruppin.ac.il/bgroup18/prod/api/Plant/";
    let herders = {
      method: "PUT",
    };
    fetch(url + plant.Plant_ID, herders);
  };

  // let contentUrl =
  //   "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";

  const getWikiData = async () => {
    let data;
    let wikLink;
    let searchUrl =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
    await fetch(searchUrl + plant.Plant_Category)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          data = result;
          wikLink = data[3][0];
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    Linking.openURL(wikLink);
  };

  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View style={styles.screenContent}>
          <Avatar
            rounded
            source={{
              uri: plant.PlantsPhotoArchive[0].Plant_Photo,
            }}
            size="xlarge"
            containerStyle={{
              marginTop: "5%",
              borderWidth: 2,
              borderColor: color,
            }}
          />
          <View style={styles.container}>
            <View style={styles.nextWatering}>
              <Text style={styles.wateringText}>Next Watering in</Text>
              <Text style={styles.wateringTextTitle}>
                {plantNextWateringInDays} days
              </Text>
              <Text style={[styles.wateringText, { opacity: 0.3 }]}>
                watering every {PlantWaterCycleInDays} days
              </Text>
            </View>
            <View style={[styles.wateringLogo, { borderColor: color }]}>
              <EntypoIcon name={emoji} color={color} size={70}></EntypoIcon>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.plantInfo}>
              <Text style={styles.wateringText}>Name: {plant.Plant_Name}</Text>
              <Text style={styles.wateringText}>
                Type: {plant.Plant_Category}
              </Text>
              <Text style={styles.wateringText}>
                Lifecycle: {plant.Plant_Lifecycle_Level}
              </Text>
            </View>
            <View style={styles.btnsContainer}>
              <TouchableOpacity
                onPress={WaterPlant}
                style={styles.touchableOpacity}
              >
                <Text style={styles.textSign}>Water </Text>
                <Ionicons name="water-outline" color={"white"} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={getWikiData}
              >
                <Text style={styles.textSign}>Learn On </Text>
                <MaterialCommunityIcons
                  name="wikipedia"
                  color={"white"}
                  size={20}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.btnsContainer}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => props.setCase(6)}
              >
                <Text style={styles.textSign}>Photo archive </Text>
                <EntypoIcon
                  name="archive"
                  color={"white"}
                  size={20}
                ></EntypoIcon>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setCase(7)}
                style={styles.touchableOpacity}
              >
                <Text style={styles.textSign}>Edit </Text>
                <EntypoIcon name="edit" color={"white"} size={20}></EntypoIcon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 11,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  screenContent: {
    width: "85%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  touchableOpacity: {
    margin: 5,
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
  },
  wateringText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  wateringTextTitle: {
    fontWeight: "bold",
    fontSize: 40,
  },
  container: {
    flexDirection: "row",
    marginTop: 20,
  },

  nextWatering: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  wateringLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 30,
    height: 125,
  },
  btnsContainer: {
    flex: 2,
    alignItems: "center",
  },
  plantInfo: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
});
