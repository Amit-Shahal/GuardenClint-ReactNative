import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import * as Animatable from "react-native-animatable";

export default function Register() {
  var email = "email";
  var name = 'name';
  var age = 'age';
  var password = 'password';
  var name = 'name';
var  confirmPassword = 'confirmPassword';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.title} animation="bounceInRight">
          Register:
        </Animatable.Text>
      </View>
      <View style={styles.footer}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(value) => (email = value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Name"
          onChangeText={(value) => (name = value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          onChangeText={(value) => (age = value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(value) => (password = value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(value) => (confirmPassword = value)}
          style={styles.textInput}
        />
      </View>
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
    flex: 5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "flex-start",
  },
  textInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
  },

  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  touchableOpacity: {
    borderRadius: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 40,
  },
});
