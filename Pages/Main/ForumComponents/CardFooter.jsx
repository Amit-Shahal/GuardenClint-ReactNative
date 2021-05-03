import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";

export default function CardFooter(props) {
  const { votes, comments } = props;

  return (
    <View style={styles.container}>
      <View style={styles.smallView}>
        <TouchableOpacity>
          <SimpleLineIcons
            name="arrow-up-circle"
            color="#000000"
            size={20}
            style={{ marginRight: 3 }}
          />
        </TouchableOpacity>

        <Text style={styles.txt}>{votes}</Text>
        <TouchableOpacity>
          <SimpleLineIcons
            name="arrow-down-circle"
            color="#000000"
            size={20}
            style={{ marginLeft: 3 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.smallView}>
        <SimpleLineIcons
          name="bubbles"
          color="#000000"
          size={22}
          style={{ marginRight: 3 }}
        />
        <Text style={styles.txt}>{comments}</Text>
      </View>
      <SimpleLineIcons name="share-alt" color="#000000" size={20} />
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
