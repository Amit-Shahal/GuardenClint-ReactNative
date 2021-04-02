import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";

export default function AddNewAreaScreen(props) {
  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#009387", fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              width: "45%",
              borderWidth: 1,
              borderTopWidth: 0,
              borderColor: "#009387",
              // borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "flex-end",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <Image
              source={require("../../../assets/addGarden.png")}
              style={{
                width: "95%",
                height: "95%",s
                borderRadius: 30,
              }}
              resizeMode="center"
            />
            <Text style={{ color: "#009387", fontSize: 20 }}>Add photo</Text>
          </View>

          <TouchableOpacity
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#009387", fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Hi, this is a add new area screen</Text>
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
    borderWidth: 3,
    borderColor: "black",
    borderBottomColor: "#FFFFFF",
  },
});
