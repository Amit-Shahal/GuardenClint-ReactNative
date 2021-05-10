import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import CardBody from "./ForumComponents/CardBody";
import CardFooter from "./ForumComponents/CardFooter";
import CardHeader from "./ForumComponents/CardHeader";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { SharedElement } from "react-navigation-shared-element";
const windowWidth = Dimensions.get("window").width;
export default function ForumDetails({ route, navigation }) {
  const { item } = route.params;

  const getPhoto = () => {
    if (item.Question_Photo !== null) {
      return (
        <SharedElement
          id={`item.${item.Question_ID}.img`}
          style={styles.imgView}
        >
          <Image
            source={{
              uri: item.Question_Photo,
            }}
            style={styles.img}
          />
        </SharedElement>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.card]}>
        {/* CARD HEADER */}
        <View style={styles.cardHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SimpleLineIcons
              name="arrow-left"
              color="#000000"
              size={20}
              style={{ marginRight: 3 }}
            />
          </TouchableOpacity>
          <CardHeader image={item.ProfileImg} Name={item.Name} />
        </View>

        {/* CARD BODY */}
        <View style={styles.CardBody}>
          <View style={styles.txtView}>
            <SharedElement id={`item.${item.Question_ID}.txt`}>
              <Text style={styles.txt} numberOfLines={1} adjustsFontSizeToFit>
                {item.Question_Content}zdcxcxzcxz 
              </Text>
            </SharedElement>
          </View>

          {getPhoto()}
        </View>
        <CardFooter
          votes={item.Question_Votes}
          comments={item.answers.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    padding: 10,
    flex: 1,
    paddingTop: StatusBar.currentHeight || 42,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  imageBG: {
    flex: 1,
  },
  CardBody: {
    flex: 1,
  },
  txtView: {
    height: 40,
    position: "relative",
  },
  txt: {
    fontSize: 34,
    fontWeight: "600",
    position: "absolute",
  },
  bodyContainer: {
    flex: 1,
  },

  imgView: {
    // height: item.Question_Photo !== null ? (windowWidth * 9) / 16 : 0,
    height: (windowWidth * 9) / 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  img: {
    width: windowWidth,
    height: (windowWidth * 9) / 16,
    position: "absolute",
  },
});
