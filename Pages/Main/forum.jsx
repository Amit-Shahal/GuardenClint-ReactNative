import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import CardBody from "./ForumComponents/CardBody";
import CardFooter from "./ForumComponents/CardFooter";
import CardHeader from "./ForumComponents/CardHeader";
const windowWidth = Dimensions.get("window").width;

export default function Forum({ navigation }) {
  const [Data, setData] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const url = "http://proj.ruppin.ac.il/bgroup18/prod/API/Forum";
    await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const getPhoto = (item) => {
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

  const scrollY = useRef(new Animated.Value(0)).current;
  const cardHight = 170;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.imageBG}
        blurRadius={5}
      >
        <Animated.FlatList
          data={Data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.Question_ID.toString()}
          contentContainerStyle={{
            padding: 10,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          refreshing={Data === undefined}
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
                <CardHeader
                  image={item.ProfileImg}
                  Name={item.Name}
                  Time={item.Time}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForumDetails", { item })}
                >
                <View style={styles.bodyContainer}>
                  <View style={styles.txtView}>
                    <SharedElement id={`item.${item.Question_ID}.txt`}>
                      <Text
                        style={styles.txt}
                        numberOfLines={3}
                        adjustsFontSizeToFit
                      >
                        {item.Question_Content}
                      </Text>
                    </SharedElement>
                  </View>
                  {getPhoto(item)}
                </View>
                </TouchableOpacity>
                <CardFooter
                  votes={item.Question_Votes}
                  comments={item.answers.length}
                  navigation={navigation}
                  item={item}
                />
              </Animated.View>
            );
          }}
        />
      </ImageBackground>
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
  },
  imageBG: {
    flex: 1,
  },
  bodyContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  txt: {
    fontSize: 24,
    fontWeight: "600",
    position: "absolute",
  },
  txtView: {
    flex: 3,
    height: 95,
    marginTop: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  imgView: {
    flex: 2,
    height: 100,
    position: "absolute",
    width: ((windowWidth - 40) / 5) * 2,
    right: "-1%",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 20,
  },
});
