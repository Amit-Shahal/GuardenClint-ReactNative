import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
const { width, height } = Dimensions.get("window");

import MaskedView from "@react-native-community/masked-view";
import Svg, { Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View
      style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}
      renderToHardwareTextureAndroid
    >
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.Photo_ID.toString()}
        removeClippedSubviews={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.Plant_Photo) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [-width, 0],
          });
          return (
            <MaskedView
              key={index}
              style={{
                width,
                height,
                position: "absolute",
              }}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  style={{
                    backgroundColor: "transparent",
                    transform: [{ translateX }],
                  }}
                >
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSvg>
              }
            >
              <Image
                source={{ uri: item.Plant_Photo }}
                style={{
                  width: width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: "cover",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}
              />
            </MaskedView>
          );
        }}
      />

      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function CarouselPhotos(props) {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = props.PlantsPhotoArchive;
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([
        { Photo_ID: "empty-left" },
        ...movies,
        { Photo_ID: "empty-right" },
      ]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.Photo_ID.toString()}
        horizontal
        // bounces={false}
        decelerationRate={0.2}
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.Plant_Photo) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });

          return (
            <View key={index} style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 30,
                }}
              >
                <Image
                  source={{ uri: item.Plant_Photo }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.LifeCycle}
                </Text>
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.dateOfCreate}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 30,
    margin: 0,
    marginBottom: 10,
  },
});
