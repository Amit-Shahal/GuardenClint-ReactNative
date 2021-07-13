import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Button, Platform, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar, CheckBox } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';



export default function AddNewAreaScreen(props) {

  const [isInDoor, setIsIndoor] = useState(true);
  const [isSunny, setIsSunny] = useState(true);
  const [newAreaName, setNewAreaName] = useState('');
  const setNewArea = () => {
    const payload = {
      'Area_Name': newAreaName,
      'AreasPhotoArchive': image,
      'isInDoor': isInDoor,
      'sunExposure': isSunny
    }
    console.log(payload)

  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

  };
  const captureImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Add Area new image",
      null,
      [
        {
          text: "capture image",
          onPress: captureImage,
        },
        {
          text: "pick image",
          onPress: pickImage,
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <Animatable.View style={styles.footer} animation="bounceInUp">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: Dimensions.get("screen").height - 300
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

            onPress={() => props.setCase(0)}
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <Text style={{ color: "#009387", fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableOpacity, { marginTop: 90 }]}>
            <Avatar
              rounded
              source={image && {
                uri: image
              }}
              icon={{ name: 'photo', color: 'gray' }}
              size="xlarge"
              onPress={showAlert}
              containerStyle={{
                marginTop: "10%",
                borderWidth: 2,
                borderColor: "#009387",
                backgroundColor: "white",
              }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <Text style={{ fontSize: 20 }}>Add photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNewArea()}
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#009387", fontSize: 20 }}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View>
            <TextInput
              placeholder="New area name"
              onChangeText={newAreaName => setNewAreaName(newAreaName)}
              style={styles.textInput}
            />
            <Text style={styles.textRadio} >Please tell me, is this area is indoor or outdoor?</Text>
            <View style={styles.radioWrap}>
              <CheckBox

                title='indoor'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={isInDoor}
                onPress={() => setIsIndoor(true)}
                containerStyle={styles.radioButton}
                checkedColor="#009387"
              />
              <CheckBox

                title='outdoor'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!isInDoor}
                onPress={() => setIsIndoor(false)}
                containerStyle={styles.radioButton}
                checkedColor="#009387"

              />

            </View>
            <Text style={styles.textRadio}>What is the area sun exposure kind?</Text>
            <View style={styles.radioWrap}>

              <CheckBox

                title='sunny'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={isSunny}
                onPress={() => setIsSunny(true)}
                containerStyle={styles.radioButton}
                checkedColor="#ffd700"
              />
              <CheckBox

                title='partly'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!isSunny}
                onPress={() => setIsSunny(false)}
                containerStyle={styles.radioButton}
                checkedColor="#009387"
              />
            </View>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  textRadio: {
    marginTop: 7,
    fontWeight: "bold"
  },
  radioButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  radioWrap: {
    flexDirection: "row",

  },
  footer: {
    flex: 11,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  touchableOpacity: {
    height: "100%",
    width: "45%",
    borderTopWidth: 0,
    borderColor: "#009387",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  img: {
    width: "100%",
    height: "85%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 15,
  },
  title: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1
  },
});
