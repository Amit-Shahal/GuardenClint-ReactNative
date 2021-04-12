import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from "react-native";
import * as Animatable from "react-native-animatable";
import GuardenPlant from "../../Components/GuardenPlant";
import AreaPhoto from "../../Components/AreaPhoto";
import { useGardenData } from "../../../Utils/UserGardenDataContext";

export default function GurdenScreen(props) {
  const userData = useGardenData();
  const { height } = Dimensions.get("screen");
  const height_card = height * 0.25;

  const createPlantsList = (area) => {
    var plantsList = [];
    for (let index = 0; index < area.userPlants.length; index += 2) {
      plantsList.push(
        <GuardenPlant
          key={index}
          index={index}
          area={area}
          setCase={props.setCase}
        />
      );
    }
    if (area.userPlants.length % 2 === 0) {
      plantsList.push(
        <View
          key={area.userPlants.length}
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: 100,
            height: "100%",
          }}
        >
          <View style={{ height: "50%" }}>
            <TouchableOpacity
              style={styles.imgView}
              onPress={() => props.setCase(4)}
            >
              <Image
                source={require("../../../assets/plus.jpg")}
                style={[styles.img, { borderWidth: 0 }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{ alignItems: "center", justifyContent: "flex-start" }}
            >
              <Text style={{ opacity: 0.2 }}>Add Plant</Text>
            </View>
          </View>
        </View>
      );
    }
    return plantsList;
  };

  if (userData.UserGurdenAreasDTO !== undefined) {
    var list = userData.UserGurdenAreasDTO.map((area, index) => (
      <View key={index} style={{ height: height_card, flexDirection: "row" }}>
        {/* area view */}
        <AreaPhoto
          setCase={props.setCase}
          areaId={area.Area_ID}
          areaPhoto={area.AreasPhotoArchive[0].Area_Photo}
          areaName={area.Area_Name}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            width: "60%",
          }}
        >
          {createPlantsList(area)}
        </ScrollView>
      </View>
    ));

    list.push(
      <View
        key={list.lenght + 1}
        style={{
          height: height_card,
          justifyContent: "flex-start",
          width: "40%",
        }}
      >
        <TouchableOpacity
          onPress={() => props.setCase(5)}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/plus.jpg")}
            style={{
              width: "85%",
              height: "90%",
              borderRadius: 30,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
          <Text style={{ opacity: 0.2 }}>Add Area</Text>
        </View>
      </View>
    );
  }

  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View style={{ flex: 1 }}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
          {list}
          {/* add new area view */}
        </ScrollView>
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
  img: {
    width: 80,
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
