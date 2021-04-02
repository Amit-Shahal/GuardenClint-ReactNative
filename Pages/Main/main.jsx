import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import ProfileAvatar from "../Components/ProfileAvatar";

import * as Animatable from "react-native-animatable";

import GuardenArea from "../Components/GuardenArea";
import { useLogin } from "../../Utils/LoginContext";
import GuardenPlant from "../Components/GuardenPlant";
import ProfileScreen from "./MainScreens/ProfileScreen";
import AreaScreen from "./MainScreens/AreaScreen";
import PlantScreen from "./MainScreens/PlantScreen";
import AddNewPlantScreen from "./MainScreens/AddNewPlantScreen";
import AddNewAreaScreen from "./MainScreens/AddNewAreaScreen";

export default function main({ navigation }) {
  const [userData, setuserData] = useState([]);
  const [renderFooter, setrenderFooter] = useState(0);

  const loginData = useLogin();

  useEffect(() => {
    getUserData();
  }, []);

  const renderFooterFunc = () => {
    switch (renderFooter) {
      case 0:
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
                <View style={{ height: height_card, flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => setCase(5)}
                    style={{
                      width: "40%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/plus.jpg")}
                      style={{
                        width: "95%",
                        height: "95%",
                        borderRadius: 30,
                      }}
                      resizeMode="center"
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Animatable.View>
        );
        break;
      case 1:
        return <ProfileScreen userData={userData}></ProfileScreen>;
      case 2:
        return <AreaScreen userData={userData}></AreaScreen>;
      case 3:
        return <PlantScreen userData={userData}></PlantScreen>;
      case 4:
        return <AddNewPlantScreen userData={userData}></AddNewPlantScreen>;
      case 5:
        return <AddNewAreaScreen userData={userData}></AddNewAreaScreen>;
      default:
        break;
    }
  };

  const setCase = (footer) => {
    setrenderFooter(footer);
  };

  async function getUserData() {
    const url =
      "http://proj.ruppin.ac.il/bgroup18/prod/api/GardenData/" +
      loginData.userId;

    await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setuserData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }

  const createPlantsList = (area) => {
    var plantsList = [];
    for (let index = 0; index < area.userPlants.length; index += 2) {
      plantsList.push(
        <GuardenPlant key={index} index={index} area={area} setCase={setCase} />
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
          }}
        >
          <TouchableOpacity
            onPress={() => setCase(4)}
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
    return plantsList;
  };

  const { height } = Dimensions.get("screen");
  const height_card = height * 0.25;

  if (userData.UserGurdenAreasDTO !== undefined) {
    var list = userData.UserGurdenAreasDTO.map((area, index) => (
      <View key={index} style={{ height: height_card, flexDirection: "row" }}>
        {/* area view */}
        <GuardenArea setCase={setCase} Area={area} />
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <TouchableOpacity style={styles.header} onPress={() => setCase(0)}>
        <Text style={styles.title}>{userData.Name}</Text>
        <ProfileAvatar
          ProfileImg={userData.ProfileImg}
          setCase={setCase}
        ></ProfileAvatar>
      </TouchableOpacity>

      {renderFooterFunc()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  footer: {
    flex: 11,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    borderColor: "black",
    borderBottomColor: "#FFFFFF",
  },
  title: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
});
