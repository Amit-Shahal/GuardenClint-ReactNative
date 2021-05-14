import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";

import CardFooter from "./ForumComponents/CardFooter";
import CardHeader from "./ForumComponents/CardHeader";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { SharedElement } from "react-navigation-shared-element";
const windowWidth = Dimensions.get("window").width;
export default function ForumDetails({ route, navigation }) {
  const { item } = route.params;
  const isThereAPhoto = item.Question_Photo !== null;
  const scrollY = useRef(new Animated.Value(0)).current;
  const cardHight = 190;
  const getPhoto = (imgUri) => {
    if (item.Question_Photo !== null) {
      return (
        <SharedElement
          id={`item.${item.Question_ID}.img`}
          style={[
            styles.imgView,
            { height: isThereAPhoto ? ((windowWidth - 20) * 9) / 16 : 0 },
          ]}
        >
          <Image
            source={{
              uri: imgUri,
            }}
            style={styles.img}
          />
        </SharedElement>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.cardQ]}>
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
              <Text style={styles.txt} numberOfLines={3} adjustsFontSizeToFit>
                {item.Question_Content}
              </Text>
            </SharedElement>
          </View>

          {getPhoto(item.Question_Photo)}
        </View>
        <CardFooter
          votes={item.Question_Votes}
          comments={item.answers.length}
        />
      </View>
      <View style={{ flex: isThereAPhoto ? 1 : 2 }}>
        <Animated.FlatList
          data={item.answers}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.Answer_ID.toString()}
          contentContainerStyle={{
            padding: 5,
          }}
          refreshing={item.answers === undefined}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              cardHight * index,
              cardHight * (index + 2),
            ];
            const opacityInputRange = [
              -1,
              0,
              cardHight * index,
              cardHight * (index + 1),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View
                style={[
                  styles.card,
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              >
                <CardHeader image={item.ProfileImg} Name={item.Name} />

                <View style={styles.bodyContainer}>
                  <View style={styles.txtViewAns}>
                    <Text
                      style={styles.txtAns}
                      numberOfLines={3}
                      adjustsFontSizeToFit
                    >
                      {item.Answer_Content}
                    </Text>
                  </View>
                  {/* {getPhoto(item.Answer_Photo)} */}
                </View>
                <CardFooter
                  votes={item.Answer_Votes}
                  comments={item.Responses.length}
                />
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardQ: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 20,
    shadowColor: "#000",

    shadowOpacity: 0.5,
    shadowRadius: 20,
    padding: 10,
    flex: 1,
    paddingTop: StatusBar.currentHeight || 42,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageBG: {
    flex: 1,
  },
  CardBody: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txtView: {
    height: 40,
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
    width: windowWidth - 20,
    height: ((windowWidth - 20) * 9) / 16,
    position: "absolute",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  imageBG: {
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
  },
  bodyContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtAns: {
    fontSize: 24,
    fontWeight: "600",
    position: "absolute",
  },
  txtViewAns: {
    flex: 3,
    height: 95,
    marginTop: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
});
