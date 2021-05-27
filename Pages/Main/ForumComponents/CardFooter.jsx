import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share } from "react-native";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
export default function CardFooter(props) {
  const { votes, comments, navigation, item } = props;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hey, Check out this tip on Guarden app",
        url: "https://reactnative.dev/docs/share",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const addVotes = () => {};
  const subtractVotes = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.smallView}>
        {/* <TouchableOpacity onPress={addVotes} > */}
        <SimpleLineIcons
          name="arrow-up-circle"
          color="#000000"
          size={20}
          style={{ marginRight: 3 }}
        />
        {/* </TouchableOpacity> */}

        <Text style={styles.txt}>{votes}</Text>
        <TouchableOpacity onPress={subtractVotes}>
          <SimpleLineIcons
            name="arrow-down-circle"
            color="#000000"
            size={20}
            style={{ marginLeft: 3 }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.smallView}
        onPress={() => navigation.navigate("ForumDetails", { item })}
      >
        <SimpleLineIcons
          name="bubbles"
          color="#000000"
          size={22}
          style={{ marginRight: 3 }}
        />
        <Text style={styles.txt}>{comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare}>
        <SimpleLineIcons name="share-alt" color="#000000" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  txt: {
    fontSize: 20,
    fontWeight: "400",
  },
  smallView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
