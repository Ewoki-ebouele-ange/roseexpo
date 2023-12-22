import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { selectAge, selectName, test } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { NavContext } from '../../App';



const HEIGHT = Dimensions.get("screen").height
const WIDTH = Dimensions.get("screen").width
const img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'
//import img1 from "../assets/images/likes2.jpg"

const VueParams = () => {
  const selectName1 = useSelector((state) => state.userAuth.name);
  const selectAge1 = useSelector((state) => state.userAuth.name);
  const dispatch = useDispatch();



  const {userData, setUserData} = useContext(NavContext)


 useEffect(() => {
   // Fonction asynchrone pour récupérer les données au montage du composant
   const fetchData = async () => {
     try {
       // Utilisation de AsyncStorage.getItem pour récupérer la valeur associée à la clé 'user'
       const storedUserData = await AsyncStorage.getItem('@MyApp_user');

       // Mise à jour de l'état avec les données récupérées
      // setUserData(storedUserData);
       setUserData( JSON.parse(storedUserData) );
       console.log("JSON.parse(storedUserData)",JSON.parse(storedUserData))
     } catch (error) {
       console.error('Erreur lors de la récupération des données :', error);
     }
   };
    // Appel de la fonction asynchrone
    fetchData();
  }, []);
  
 // console.log( "userData42258",userData.name)
 
  return (
    <View style={styles.container}>
      <View style={{ height: "40%", width: WIDTH, backgroundColor: 'white', marginTop: 9 }}>
        <View style={{ position: "relative", height: 130, width: 130, borderRadius: 80, backgroundColor: "#F63A6E", alignSelf: "center", alignItems: "center", marginTop: 45 }}>
          <TouchableOpacity style={{ backgroundColor: "white", height: 120, width: 120, borderRadius: 80, }}>
            {/* <Image
              source={{ uri: img }}
              style={{ height: 120, width: 120, borderRadius: 80, backgroundColor: "white", alignSelf: "center" }}
            /> */}
            <FontAwesome style={{ alignSelf: "center", }} name="user-circle" size={119} color="#eee" />
          </TouchableOpacity>
          <TouchableOpacity style={{ top: 5, right: 8, position: "absolute", height: 29, width: 29, backgroundColor: "#eee", borderRadius: 20, alignContent: "center" }}>
            <EvilIcons style={{ position: "absolute", }} name="pencil" size={29} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 30, fontWeight: "500", textAlign: "center" }}></Text>
      </View>
      {/** PUB */}
      <View style={{ height: "17%", width: WIDTH, backgroundColor: "#eee", flexDirection: "row", justifyContent: "space-between", }}>
        <TouchableOpacity onPress={()=>console.log(userData)} style={{ height: 85, width: 85, backgroundColor: "white", borderRadius: 20, margin: 15 }}>
          <MaterialIcons style={{ position: 'absolute', right: 0, top: 1 }} name="add-circle-outline" size={24} color="gray" />
          <View style={{ alignSelf: "center", marginTop: "15%" }}>
            <Image style={{ height: 30, width: 30, borderRadius: 50, alignSelf: "center" }} source={require("../../assets/images/like3.png")} />
            <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>0 Likes</Text>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "rgba(147, 250, 165,1)" }}>Ajouter</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>dispatch(test(userData))} style={{ height: 85, width: 85, backgroundColor: "white", borderRadius: 20, margin: 15 }}>
          <MaterialIcons style={{ position: 'absolute', right: 0, top: 1 }} name="add-circle-outline" size={24} color="gray" />
          <View style={{ alignSelf: "center", marginTop: "15%" }}>
            <Image style={{ height: 30, width: 30, borderRadius: 50, alignSelf: "center" }} source={require("../../assets/images/like3.png")} />
            <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>0 Likes</Text>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "rgba(147, 250, 165,1)" }}>Ajouter</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 85, width: 85, backgroundColor: "white", borderRadius: 20, margin: 15 }}>
          <MaterialIcons style={{ position: 'absolute', right: 0, top: 1 }} name="add-circle-outline" size={24} color="gray" />
          <View style={{ alignSelf: "center", marginTop: "15%" }}>
            <Image style={{ height: 30, width: 30, borderRadius: 50, alignSelf: "center" }} source={require("../../assets/images/like3.png")} />
            <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>0 Likes</Text>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "rgba(147, 250, 165,1)" }}>Ajouter</Text>
          </View>
        </View>
      </View>

      <View style={{ height: "43%", width: WIDTH, backgroundColor: "#eee" }}>
        <View style={{ borderWidth: 1, height: "95%", width: "90%", alignSelf: 'center', borderRadius: 20, backgroundColor: "white" }}>
          
        </View>
      </View>
    </View>
  )
}

export default VueParams

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between"
  }
})