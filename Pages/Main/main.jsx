import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import ProfileAvatar from "../Components/ProfileAvatar";

import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useLogin } from "../../Utils/LoginContext";
import ProfileScreen from "./MainScreens/ProfileScreen";
import AreaScreen from "./MainScreens/AreaScreen";
import PlantScreen from "./MainScreens/PlantScreen";
import AddNewPlantScreen from "./MainScreens/AddNewPlantScreen";
import AddNewAreaScreen from "./MainScreens/AddNewAreaScreen";
import GardenScreen from "./MainScreens/GardenScreen";
import EditPlantScreen from "./MainScreens/EditPlantScreen";

import { useUpdateGardenData } from "../../Utils/UserGardenDataContext";
import { useGardenData } from "../../Utils/UserGardenDataContext";
import PlantArchiveScreen from "./MainScreens/PlantArchiveScreen";

export default function main({ navigation }) {
  const [renderFooter, setrenderFooter] = useState(0);
  const loginData = useLogin();
  const setGardenData = useUpdateGardenData();
  const [title, settitle] = useState(true);
  const [plantPreesed, setplantPreesed] = useState([]);
  const GardenData = useGardenData();
  useEffect(() => {
    getUserData();
  }, [title]);

  const renderFooterFunc = () => {
    switch (renderFooter) {
      case 0:
        return <GardenScreen setCase={setCase} />;
      case 1:
        return <ProfileScreen />;
      case 2:
        return <AreaScreen />;
      case 3:
        return <PlantScreen plantPreesed={plantPreesed} setCase={setCase} />;
      case 4:
        return <AddNewPlantScreen />;
      case 5:
        return <AddNewAreaScreen />;
      case 6:
        return (
          <PlantArchiveScreen
            PlantsPhotoArchive={plantPreesed.PlantsPhotoArchive}
          />
        );
      case 7:
        return <EditPlantScreen plant={plantPreesed} />;
      default:
        break;
    }
  };

  const setCase = (footer, plaPreesed) => {
    if (footer === 3) setplantPreesed(plaPreesed);
    setrenderFooter(footer);
    footer === 0 ? settitle(true) : settitle(false);
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
          setGardenData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ImageBackground
        source={require("../../assets//bg.jpg")}
        style={styles.imageBG}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            setCase(0);
          }}
        >
          {title ? (
            <>
              <Text style={styles.title}>{GardenData.Name}</Text>
              <Animatable.View animation="bounceInRight">
                <ProfileAvatar
                  ProfileImg={GardenData.ProfileImg}
                  setCase={setCase}
                ></ProfileAvatar>
              </Animatable.View>
            </>
          ) : (
            <>
              <Animatable.View
                animation="bounceInRight"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialIcons name="arrow-left" color="white" size={30} />
                <Text style={styles.title}>Back</Text>
              </Animatable.View>
            </>
          )}
        </TouchableOpacity>

        {renderFooterFunc()}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
  },
  header: {
    flex: 3,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000000",
    textShadowRadius: 10,
  },
});
