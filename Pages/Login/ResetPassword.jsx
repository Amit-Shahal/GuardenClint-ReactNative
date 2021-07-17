import React, { useState } from "react";
import { Alert } from "react-native";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import * as Animatable from "react-native-animatable";

export default function ResetPassword({ navigation, route }) {
  const [isLoading, setisLoading] = useState(false);
  var newPassword = "albert";
  var newPasswordConfirmation = "einstein";

  const resetPassword = async () => {
    if (newPassword !== newPasswordConfirmation) {
      alert("Password and Confirmation Password must match");
      return
    }
    setisLoading(true);
    const url = "http://proj.ruppin.ac.il/bgroup18/prod/api/userLogin/changeUserEmail";
    let user = {
      Email: route.params.Email,
      Password: newPassword,
    };

    let isPasswordReset = false;
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
            isPasswordReset = result;
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    setisLoading(false);
    if (isPasswordReset === true) {
      alert('Password restarted successfully')
      navigation.navigate("login");
    } else {
      alert("Someting went worng");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInRight">
        <Text style={styles.title}>step 3 of 3</Text>
      </Animatable.View>
      {isLoading ? (
        <Animatable.View
          style={[styles.footer, { justifyContent: "flex-start" }]}
          animation="bounceInDown"
          duration={1000}
        >
          <Text style={styles.title}>Reseting your password...</Text>
          <ActivityIndicator size="large" />
        </Animatable.View>
      ) : (
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="New Password"
            autoCapitalize={'none'}
            onChangeText={(value) => (newPassword = value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="New Password Confirmation"
            autoCapitalize={'none'}
            onChangeText={(value) => (newPasswordConfirmation = value)}
          />
          <TouchableOpacity style={styles.btn} onPress={resetPassword}>
            <Text style={styles.btbText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
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
    borderWidth:3,
    borderColor: 'black',
  },

  title: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
  },
  btn: {
    borderWidth:3,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#009387",
    alignSelf: "center",
    width: 100,
    height: 40,
  },
  textInput: {
    alignSelf: "center",
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  btbText: {
    fontWeight: "bold",
    color: "white",
  },
});
