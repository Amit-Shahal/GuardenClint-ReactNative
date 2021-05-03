import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,

} from "react-native";
import * as Animatable from "react-native-animatable";
import UploadImage from "../../Components/UploadImage";

export default function AreaScreen(props) {
  let newName = "";

  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View style={styles.footerContent}>
        <View style={styles.container}>
          <UploadImage />
        </View>
        <View style={styles.footerContent}>
          <View style={styles.textInputContainer}>
            <Text style={styles.inputTextTitle}>Name: </Text>
            <TextInput
              placeholder={props.plant.Plant_Name}
              // value={props.plant.Plant_Name}
              leftIcon={{ type: "Entypo", name: "email" }}
              onChangeText={(value) => (newName = value)}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.footerContent}></View>
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
  container: {
    flex: 1,
    flexDirection: "row",
  },
  btnsContainer: {
    width: "80%",
    alignItems: "center",
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
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  textInput: {
    height: 50,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  footerContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  inputTextTitle: {
    fontWeight: "bold",
    // fontSize='20',
  },
});
