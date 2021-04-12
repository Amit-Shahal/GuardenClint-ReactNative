import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUpdateLogin } from "../../Utils/LoginContext";

const SplashScreen = ({ navigation }) => {
  var jsonValue;
  const [isLoading, setisLoading] = useState(false);
  const setLoginData = useUpdateLogin();

  useEffect(() => {
    async function asyncFun() {
      await getData();
      if (jsonValue !== null) {
        setLoginData(jsonValue);
        await checkUserLogin();
      }
    }
    asyncFun();
  }, []);

  const getData = async () => {
    jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue != null) {
      jsonValue = JSON.parse(jsonValue);
    } else {
      jsonValue = null;
    }
  };

  const checkUserLogin = async () => {
    setisLoading(true);
    const url = "http://proj.ruppin.ac.il/bgroup18/prod/API/userLogin";
    let isLoged = false;
    let userId = -1;

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(jsonValue),
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
          isLoged = result.isLoged;
          userId = result.userId;
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    setisLoading(false);
    if (isLoged === true) {
      navigation.navigate("mainStack", {
        screen: "main",
        params: { userId: userId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ImageBackground
        source={require("../../assets//bg.jpg")}
        style={styles.imageBG}
      >
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            easing="ease-out"
            source={require("../../assets/guardenPng.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text
            style={[
              styles.title,
              {
                color: "#FFFFFF",
                textShadowColor: "#000000",
                textShadowRadius: 10,
                letterSpacing: 5,
              },
            ]}
          >
            Guarden
          </Text>
        </View>
        {isLoading ? (
          <Animatable.View
            style={[styles.footer, { justifyContent: "flex-start" }]}
            animation="bounceInUp"
            duration={1000}
          >
            <Text style={styles.title}>Loading your Garden</Text>
            <ActivityIndicator size="large" />
          </Animatable.View>
        ) : (
          <Animatable.View
            style={styles.footer}
            animation="bounceInUp"
            delay={200}
            duration={3000}
          >
            <Text style={[styles.title, { fontSize: 25 }]}>
              Stay connected with your Garden!
            </Text>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.button}
            >
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate("login")}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </TouchableOpacity>
            </Animatable.View>
            <Text style={styles.text}>
              Proudly presented to you by Danielle Malachi & Amit Shahal
            </Text>
          </Animatable.View>
        )}
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#009387",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "black",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#000000",
    fontSize: 50,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
    opacity: 0.3,
  },
  button: {
    flex: 3,
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  touchableOpacity: {
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 40,
  },
  imageBG: {
    flex: 1,
  },
});
