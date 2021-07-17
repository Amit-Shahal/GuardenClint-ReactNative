import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-elements";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useGardenData } from "../../../Utils/UserGardenDataContext";

export default function AreaScreen(props) {
  const GardenData = useGardenData();

const [area,setArea]=useState();
 
useEffect(()=>{setAreaInf()},[])

const setAreaInf = async () =>{
const areaselectedid = await AsyncStorage.getItem('selectedArea');
const foundArea = GardenData.UserGurdenAreasDTO.find(areaObject => areaObject.Area_ID == areaselectedid);
setArea(foundArea);
}
const getPlantsNames = (userPlants) => {

  return userPlants?.map((plant) => plant.Plant_Name).join(", ");
}

  return (
    <Animatable.View
      style={styles.footer}
      animation="bounceInUp"
    >
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
      
      <View style={{alignItems:"center"}}> 
<Avatar
            rounded
            source={{
              uri: area?.AreasPhotoArchive[0].Area_Photo
            }} 
            size="xlarge"
            containerStyle={{
              marginTop: "10%",
              borderWidth: 2,
              borderColor: "black",            
            }}
          >
            
          </Avatar>
          <View style={styles.btnsContainer} >
            <Text style={styles.textStyle}>May I introduce to you the {area?.Area_Name } area</Text>
          <Text style={styles.textStyle}>This gardening area is located {area?.isInDoor ? 'indoor' : 'outdoor'} and the sun exposure is {area?.sunExposure.toLowerCase()}. </Text>
          <Text style={styles.textStyle}>{area?.Area_Name } area includes {area?.userPlants.length} happy plant{area?.userPlants.length > 1 && 's'}.</Text>
          <Text style={styles.textStyle}>{area?.Area_Name } area plant{area?.userPlants.length > 1 && 's'} name{area?.userPlants.length > 1 && 's'}: {
            getPlantsNames(area?.userPlants)
            
          }</Text>
          {/* {console.log(area)} */}
              {/* <TouchableOpacity
                onPress={() => props.setCase(7)}
                style={styles.touchableOpacity}
              >
                
                  <Text style={styles.textSign}>Edit </Text>
                <EntypoIcon name="edit" color={"white"} size={20}></EntypoIcon>
                
              </TouchableOpacity> */}
            </View>
      </View>
    
  </View>      
 </Animatable.View>
  );
}

const styles = StyleSheet.create({
  textStyle:{
    fontSize:18,
    textAlign:"center",
    
  },
  footer: {
    flex: 11,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
  },
  touchableOpacity: {
    margin: 5,
    display:"flex",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginTop:"10%",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  btnsContainer: {
    flex: 2,
    alignItems: "center",
    marginTop:"5%",
  },
});
