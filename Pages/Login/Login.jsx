import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUpdateLogin } from "../../Utils/LoginContext";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

export default function Login({ navigation }) {
  const setLoginData = useUpdateLogin();

  var email = "albert";
  var password = "einstein";
  const [isLoading, setisLoading] = useState(false);

  const setDataToAsyncStorage = (user) => {
    const userValue = JSON.stringify(user);
    AsyncStorage.setItem("user", userValue);
  };

  const checkUserLogin = async () => {
    setisLoading(true);
    const url = "http://proj.ruppin.ac.il/bgroup18/prod/API/userLogin";
    let user = {
      Email: email,
      Password: password,
    };
    let isLoged = false;
    let userId = -1;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
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
      user = { ...user, userId: userId };
      setDataToAsyncStorage(user);
      setLoginData(user);
      navigation.navigate("mainStack", {
        screen: "main",
      });
    } else {
      alert("Wrong username or password");
    }
  };

  async function fetchdataFromFacebook() {
    try {
      await Facebook.initializeAsync({
        options: {
          appId: "246006493900229",
          appName: "Guarden",
        },
      });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
        );
        const userInfo = await response.json();
        //add async and db
        email = userInfo.email;
        password = userInfo.id;
        checkUserLogin();
      } else {
        alert(`Facebook Login cancel`);
        type === "cancel";
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "105929197820-9tdidelo848nqp7a0jcjftpl4vt7uem7.apps.googleusercontent.com",
        iosClientId:
          "105929197820-nsonlqf9avh27cioojerpad08krl33ub.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      email = result.email;
      password = result.id;
      checkUserLogin();
      if (result.type === "success") {
        console.log("success");
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets//bg.jpg")}
        style={styles.imageBG}
      >
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Text style={styles.title} animation="bounceInRight">
            Welcome !
          </Animatable.Text>
        </View>

        {isLoading ? (
          <Animatable.View
            style={[styles.footer, { justifyContent: "flex-start" }]}
            animation="bounceInDown"
            duration={1000}
          >
            <Text style={styles.title}>Checking your Email...</Text>
            <ActivityIndicator size="large" />
          </Animatable.View>
        ) : (
          <Animatable.View
            style={styles.footer}
            animation="bounceInUp"
            duration={3000}
          >
            <View style={styles.loginContainer}>
              <TextInput
                keyboardType="email-address"
                placeholder="Email"
                leftIcon={{ type: "Entypo", name: "email" }}
                onChangeText={(value) => (email = value)}
                style={styles.textInput}
              />
              <View style={styles.passwordContainer}>
                <View style={styles.forgotPasswordInput}>
                  <TextInput
                    placeholder="Password"
                    leftIcon={{ type: "Entypo", name: "lock" }}
                    secureTextEntry={true}
                    onChangeText={(value) => (password = value)}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity
                  style={styles.btnForgotPassword}
                  onPress={() => navigation.navigate("VerifyUserByEmail")}
                >
                  <Text style={styles.textForgot}>Forgot ?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnLogin}>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                >
                  <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={checkUserLogin}
                  >
                    <Text style={styles.textSign}>LOG IN</Text>
                    <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                    />
                  </TouchableOpacity>
                </Animatable.View>
                <TouchableOpacity
                  style={[
                    styles.touchableOpacity,
                    { backgroundColor: "#3975FF", marginTop: 15 },
                  ]}
                  onPress={fetchdataFromFacebook}
                >
                  <View>
                    <Image
                      style={{ height: 32, width: 32 }}
                      source={require("../../assets/facebook_logo.png")}
                      resizeMode="center"
                    ></Image>
                  </View>
                  <Text style={[styles.textSign, { fontStyle: "italic" }]}>
                    Facebook
                  </Text>
                  <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.touchableOpacity,
                    { backgroundColor: "white", marginTop: 15 },
                  ]}
                  onPress={signInWithGoogleAsync}
                >
                  <View>
                    <Image
                      style={{ height: 32, width: 32 }}
                      source={require("../../assets/google_logo.png")}
                      resizeMode="center"
                    ></Image>
                  </View>
                  <Text
                    style={[
                      styles.textSign,
                      { fontStyle: "italic", color: "black" },
                    ]}
                  >
                    Google
                  </Text>
                  <MaterialIcons name="navigate-next" color="black" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bntRegisterContainer}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.textSign}>New? Register Now</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ opacity: 0.15 }}>To see dummy user example:</Text>
            <Text style={{ opacity: 0.15 }}>email - amit164973@gmail.com</Text>
            <Text style={{ opacity: 0.15 }}>password - admin</Text>
          </Animatable.View>
        )}
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
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  footer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "flex-end",
  },
  textInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000000",
    textShadowRadius: 10,
  },
  loginContainer: {
    flex: 4,
  },
  btnLogin: {
    marginTop: 15,
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  textForgot: {
    color: "#009387",
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
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
  bntRegisterContainer: {
    alignSelf: "center",
    marginBottom: 50,
  },

  btnForgotPassword: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 40,
    flex: 1.2,
  },
  forgotPasswordInput: {
    flex: 5,
  },
});
//C:\Users\amit1\OneDrive\Desktop\openssl
//keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | "C:\Users\amit1\OneDrive\Desktop\openssl\bin\openssl.exe" sha1 -binary | "C:\Users\amit1\OneDrive\Desktop\openssl\bin\o enssl.exe" base64
