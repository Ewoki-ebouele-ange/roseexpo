import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity, Text, View, Pressable } from 'react-native';

// import EditScreenInfo from '../EditScreenInfo';
// import { Text, View } from '../Themed';
import Slider from '@react-native-community/slider';
import React, { useContext, useState } from 'react';
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Octicons } from '@expo/vector-icons';

import { NavContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { selectAgeBoolean, selectAgeMax, selectBois, selectDistanceMax, selectDistanceMaxBoolean, selectFumes, selectName, updateUserDate, validerParametre } from '../../store/authSlice';

import { db } from '../../config';
import { doc, updateDoc  } from 'firebase/firestore';


const tabBois = [false, true]
const tabFumes = [false, true]
const tabRecherche = ["Sexe", "Coup d'un soir ", "Relation à distance", "Amitier",]
const tab2 = ["Bachelors2", "In college", "High School", "phD", "In Grad School", "Master", "Trade School",]
const tab3 = ["Bachelors3", "In college", "High School", "phD", "In Grad School", "Master", "Trade School",]
const tabInt = [
  "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique",
  "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique",
  "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique",
  "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique", "Harry Potter", "Génération 90", "SoundCloud", "Spa", "Prendre soin de toi", "Heavy Métal",
  "Fètes à la maison", "Gin Tonic", "Gymnastique",
]
export default function ModalScreen() {

  const username = useSelector(selectName);
  const dispatch = useDispatch();

  const [distance, setDistance] = useState(1)
  const [age1, setAge1] = useState(18)
  const [nombrePhoto, setNombrePhoto] = useState(0)

  const { distanceMax, setDistanceMax, ageMax, setAgeMax, boir, setBoir, fumer, setFumer, age, setAge,
    interet, setInteret, distanceMaxBoolean, setDistanceMaxBoolean, ageMaxBoolean, setAgeMaxBoolean, userData } = useContext(NavContext)

  const [isEnabled, setIsEnabled] = useState(false);

  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitchFumer = () => setFumer(previousState => !previousState);
  const toggleSwitchBois = () => setBoir(previousState => !previousState);
  const toggleSwitchDistance = () => setDistanceMaxBoolean(previousState => !previousState);
  const toggleSwitchAge = () => setAgeMaxBoolean(previousState => !previousState);


  const [isModalVisible, setModalVisible] = useState(false);
  const [tableauModal1, setTableauModal1] = useState([""])
  const [nomRubrique, setNomRubrique] = useState("rubrique")

  function VoirModal1(nomRubrique1, tableauRubrique1) {
    setTableauModal1(tableauRubrique1)
    setNomRubrique(nomRubrique1)
    setModalVisible(!isModalVisible)
  }
  console.log("userdat", userData)

  const validerParams = async () => {
    const user = {
      isLoggedIn: true,
      ville:userData.ville ,
      email: userData.email,
      name: userData.name,
      genre:userData.genre,
      age:userData.age,
      id:userData.id,
      metier:userData.metier,
      genre:userData.genre,
      dateNaissance:userData.dateNaissance,
      tabInteret:userData.tabInteret,
      categorieRose:userData.categorieRose,
      position:userData.position,
      password:userData.password,
      phoneNumber:userData.phoneNumber,
      tabImg:userData.tabImg,

      distanceMax: distanceMax,
      distanceMaxBoolean: distanceMaxBoolean,
      bois: boir,
      fumes: fumer,
      ageMax: ageMax,
      ageMaxBoolean: ageMaxBoolean,

    }

    await updateDoc(doc(db, 'users', userData.id), {
      
      distanceMax: distanceMax,
      distanceMaxBoolean: distanceMaxBoolean,
      bois: boir,
      fumes: fumer,
      ageMax: ageMax,
      ageMaxBoolean: ageMaxBoolean,
      interet: interet,
    })
      .then(() => {
        dispatch(validerParametre(user))
        setModalMenu(false);
      })
    .catch((error) => {
        alert(error.message)
    })
     dispatch(updateUserDate(user))
   

  }


  const Modal1 = ({ titre }) => {

    const [tabInteret, setTabInteret] = React.useState([])
    const tabInt = [""]

    const ajouterElement = (donnee) => {
      // Utilisation de la fonction de mise à jour pour ajouter un élément
      if (tabInteret.length < 5) {
        if (tabInteret.some((element) => element.value === donnee)) {
          setTabInteret((prevState) =>
            prevState.filter((element) => element.value !== donnee)
          );
        } else {
          setTabInteret((prevState) => [
            ...prevState,
            { value: donnee },
          ]);
        }
      }
      if (tabInteret.some((element) => element.value === donnee)) {
        setTabInteret((prevState) =>
          prevState.filter((element) => element.value !== donnee)
        );
      }

    };


    return (
      <Modal isVisible={isModalVisible}>
        <SafeAreaView style={{ height: HEIGHT }}>
          <TouchableOpacity style={{ height: HEIGHT * 0.7, width: WIDTH, alignSelf: "center" }}>
            <Text></Text>
          </TouchableOpacity>
          <View style={{ height: HEIGHT * 0.6, width: WIDTH, backgroundColor: "white", alignSelf: "center", position: "absolute", bottom: 0, borderRadius: 25 }}>
            {/** header */}
            <View style={{ height: 70, width: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, }}>
              <View style={{ alignSelf: "center", backgroundColor: "gray", width: 70, height: 5, marginTop: 5, borderRadius: 5 }}></View>
              <Pressable onPress={() => setModalVisible(!isModalVisible)}>
                <Entypo name="cross" size={25} color="gray" style={{ alignItems: 'center', justifyContent: "center", paddingTop: 1, marginLeft: 10, backgroundColor: "white", width: 25, }} />
              </Pressable>
              <View>
                <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "800" }}>{nomRubrique}</Text>
              </View>
            </View>

            {/** corps */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: "auto", backgroundColor: 'white', flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
              {
                tableauModal1.map((value, index) => (
                  <TouchableOpacity key={index} style={{ borderWidth: 2, borderRadius: 20, height: 35, borderColor: "gray", marginLeft: 10, alignContent: "center", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ textAlign: "center", color: "gray", padding: 5 }}>{value}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

            <TouchableOpacity style={{ height: 10, }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 13, alignSelf: "center" }}></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={validerParams} style={{ height: 50, width: "70%", backgroundColor: '#F63A6E', alignSelf: "center", marginTop: 10, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 13, alignSelf: "center" }}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 50, }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 13, alignSelf: "center" }}></Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  const modalMenu = useContext(NavContext)?.modalMenu
  const setModalMenu = useContext(NavContext)?.setModalMenu
 
  

  return (
    <Modal isVisible={modalMenu}>
      <View style={{ width: WIDTH, backgroundColor: "white", height: HEIGHT, alignSelf: "center" }}>
        <View style={{ backgroundColor: "white", height: "13%", width: WIDTH, flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontFamily: "bold", textAlign: "center", alignSelf: "center", marginTop: "15%", fontSize: 20, color: "gray" }}></Text>
          <Text style={{ fontFamily: "bold", textAlign: "center", alignSelf: "center", marginTop: "10%", fontSize: 20, color: "gray" }}>Parametres</Text>
          <TouchableOpacity
            onPress={validerParams}
            style={{ marginTop: "15%", alignSelf: "flex-end", marginRight: 10, position: "absolute", right: 0, top: 7 }}>
            <Text style={{ fontFamily: "bold", fontSize: 14, color: "#318CE7" }}>Valider</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <View style={{ width: WIDTH, backgroundColor: "white", marginTop: 5, alignSelf: "center" }}>

            <View style={{ alignSelf: "center", marginTop: 5 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Distance maximale</Text>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>{distanceMax} km</Text>
              </View>
              <Slider
                style={{ width: WIDTH * 0.9, height: 5, alignSelf: "center" }}
                minimumValue={1}
                maximumValue={2000}
                minimumTrackTintColor="#F63A6E"
                maximumTrackTintColor="gray"
                onValueChange={setDistanceMax}
                value={distanceMax}
                step={1}
              />
            </View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Only show people in this range</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#F63A6E' }}
                thumbColor={distanceMaxBoolean ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchDistance}
                value={distanceMaxBoolean}
              />
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Age maximale</Text>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>{ageMax} ans</Text>
              </View>
              <Slider
                style={{ width: WIDTH * 0.9, height: 5, alignSelf: "center" }}
                minimumValue={18}
                maximumValue={70}
                minimumTrackTintColor="#F63A6E"
                maximumTrackTintColor="gray"
                onValueChange={setAgeMax}
                value={ageMax}
                step={1}
              />
            </View>

            <View style={{ marginBottom: 10, alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Only show people in this range</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#F63A6E' }}
                thumbColor={ageMaxBoolean ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchAge}
                value={ageMaxBoolean}
              />
            </View>

          </View>

          <View style={{ marginTop: 2, width: WIDTH, padding: 10, flexDirection: "column", justifyContent: "space-around", backgroundColor: "rgba(239, 239, 240,1)" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(239, 239, 240,1)" }}>
              <View style={{ padding: 5, borderRadius: 10, alignSelf: "center", backgroundColor: "rgba(239, 239, 240,1)" }}>
                <Text style={{ fontWeight: "bold", color: "gray", fontSize: 15, alignItems: "center" }}>PREMIUM DISCOVERY</Text>
              </View>
              <View style={{ backgroundColor: "gold", padding: 5, borderRadius: 10, alignSelf: "center", }}>
                <Text style={{ fontWeight: "bold", color: "gray", fontSize: 15 }}>Spark Gold</Text>
              </View>
            </View>
            <View style={{ padding: 5, backgroundColor: "rgba(239, 239, 240,1)" }}>
              <Text style={{ color: "rgba(189, 195, 199,1)" }} >Preferences show you people who match your vibe, but won't limit who you see -- you'll still be able to match with people outside of your selections.</Text>
            </View>
          </View>

          <View style={{ width: WIDTH, backgroundColor: "white", marginTop: 15 }}>

            {/* <View style={{ alignSelf: "center", marginTop: 5 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Nombre minimal de photos</Text>
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>{nombrePhoto}</Text>
              </View>
              <Slider
                style={{ width: WIDTH * 0.9, height: 5, alignSelf: "center" }}
                minimumValue={0}
                maximumValue={15}
                minimumTrackTintColor="#F63A6E"
                maximumTrackTintColor="gray"
                onValueChange={setNombrePhoto}
                value={nombrePhoto}
                step={1}
              />
            </View> */}



            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <FontAwesome5 style={{ alignSelf: "center" }} name="smile-wink" size={24} color="gray" />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Centre d'interet</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Centre d'interet", tabInt,)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: 'center' }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <EvilIcons name="eye" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Tu recherches ?</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Tu recherches ?", tabRecherche)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            {/* <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <MaterialCommunityIcons name="zodiac-cancer" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Zodiac</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Zodiac", tab3)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View> */}

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Entypo name="drink" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Bois</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#F63A6E' }}
                thumbColor={boir ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchBois}
                value={boir}
              />
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <FontAwesome5 name="smoking" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Fume</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#F63A6E' }}
                thumbColor={fumer ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setFumer}
                value={fumer}
              />
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>


            {/* <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Ionicons name="ios-school-outline" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Education</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Education", tab2)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <FontAwesome5 name="baby-carriage" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Family Plans</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Family Plans", tab2)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <MaterialIcons name="person-outline" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Personality Type</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Personality", tab2)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Fontisto name="open-mouth" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Communication Style</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Communication Style", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Ionicons name="heart-circle-outline" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Love Style</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Love Style", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Entypo name="drink" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Drinking</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Drinking", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <FontAwesome5 name="smoking" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Smoking</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Smoking", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Ionicons name="md-git-network-outline" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Workout</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Workout", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Entypo name="email" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Network</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Network", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "rgba(239, 239, 240,1)", width: WIDTH * 0.9, height: 2, marginTop: 10, alignSelf: "center" }}></View>

            <View style={{ alignSelf: "center", marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: WIDTH * 0.9 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <MaterialCommunityIcons name="sleep" size={24} color="gray" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "500", color: "gray", margin: 5 }}>Sleeping Habits</Text>
              </View>
              <TouchableOpacity onPress={() => VoirModal1("Sleeping Habits", tab1)} style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ textAlign: "center" }}>select</Text>
                <AntDesign name="right" size={17} color="black" />
              </TouchableOpacity>
            </View> */}

            <View style={{ height: 25 }}></View>


          </View>

          <Modal1 />

        </ScrollView>
      </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    // alignItems: 'center',
    //justifyContent: 'center',
    // backgroundColor: "rgba(239, 239, 240,1)",
    //  backgroundColor: "red",
    //  marginBottom: 25,
    //  width: WIDTH,
    //  height:HEIGHT,
    // alignSelf:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});