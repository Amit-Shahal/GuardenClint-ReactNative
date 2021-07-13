import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar, CheckBox, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import { Alert, ScrollView } from "react-native";



export default function AddNewPlantScreen(props) {
  const [plantName, setPlantName] = useState('');
  const [plantCatergory, setCategory] = useState('');
  const [lifecycle, setLifecycle] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [dateTimeWater, setDateTimeWater] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTimeWater(date)
    hideDatePicker();
  }


  const setNewPlant = () => {
    const payload = {
      'LastWateringInMinutes': dateTimeWater,
      'Plant_Category': plantCatergory,
      'Plant_Lifecycle_Level': lifecycle,
      'Plant_Name': plantName,
      'Plant_Photo': image
    }
    console.log(payload)
  }

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
      "Add plant new image",
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
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <ScrollView contentContainerStyle={{alignItems: "center"}} >
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
            <TouchableOpacity style={[styles.touchableOpacity, { marginTop: 70 }]}>
              <Avatar
                rounded
                onPress={showAlert}
                source={image && {
                  uri: image
                }}
                icon={{ name: 'photo', color: 'gray' }}
                size="xlarge"
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
              onPress={() => setNewPlant()}
              style={{
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#009387", fontSize: 20 }}>Done</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.container}>
            <View>
              <TextInput
                placeholder="New plant name"
                onChangeText={plantName => setPlantName(plantName)}
                style={styles.textInput}
              />
              <TextInput
                placeholder="New plant category"
                onChangeText={plantCatergory => setCategory(plantCatergory)}
                style={styles.textInput}
              />
              <View style={styles.radioWrap}>
                <View>
                  <Button title="Last time this plant had a drink was.." type='outline' onPress={showDatePicker} />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 20 }} >Plant's lifecycle level is:</Text>
                <CheckBox
                  title='seeds'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={lifecycle == 0}
                  onPress={() => setLifecycle(0)}
                  containerStyle={styles.radioButton}
                  checkedColor="#009387"
                />
                <CheckBox

                  title='young plant'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={lifecycle == 1}
                  onPress={() => setLifecycle(1)}
                  containerStyle={styles.radioButton}
                  checkedColor="#009387"
                />
                <CheckBox

                  title='mature plant'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={lifecycle == 2}
                  onPress={() => setLifecycle(2)}
                  containerStyle={styles.radioButton}
                  checkedColor="#009387"
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
  container: {
    flex: 1
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
  textInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 15,
  },
});
