import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardBody from "./ForumComponents/CardBody";
import CardFooter from "./ForumComponents/CardFooter";
import CardHeader from "./ForumComponents/CardHeader";

export default function Forum() {
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
          // console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const cardHight = 190;
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
                <CardHeader image={item.ProfileImg} Name={item.Name} />
                <TouchableOpacity>
                  <CardBody
                    image={item.Question_Photo}
                    text={item.Question_Content}
                  />
                  <CardFooter
                    votes={item.Question_Votes}
                    comments={item.answers.length}
                  />
                </TouchableOpacity>
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
});
