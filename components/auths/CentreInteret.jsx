import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'
import React, { useContext } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../store/authSlice';
import { NavContext } from '../../App';

import { db } from '../../config';
import { doc, updateDoc  } from 'firebase/firestore';



const tableauModal1 = [
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
const CentreInteret = ({ navigation, route }) => {
    const [genre1, setGenre1] = React.useState("")
    const [validGenreF, setValidGenreF] = React.useState(false)
    const [validGenreH, setValidGenreH] = React.useState(false)
    const [validGenre, setValidGenre] = React.useState(false)
    const newLocal = "tabs";

    const nav = useNavigation()
    const {user, tabInteret, setTabInteret}= useContext(NavContext)



    const tabInt = [""]
    function insererDansTableau(donnee) {
        const index = tabInt.indexOf(donnee);
        console.warn(tabInt.includes(donnee))

        if (!tabInt.includes(donnee)) { tabInt.push(donnee) }
        else {
            if (index !== -1) {
                tabInt.splice(index, 1);
            }
        }
        console.log(tabInt)
    }
    // Fonction pour supprimer un élément du tableau
    const supprimerElement = () => {
        // Utilisation de la fonction de mise à jour pour supprimer le dernier élément
        setTabInteret((prevState) => prevState.slice(0, -1));
    };

    function selectGenre(gr) {
        setGenre1(gr)
        setValidGenre(true)
        if (gr === "F") {
            setValidGenreF(true)
            setValidGenreH(false)
        }
        else {
            setValidGenreH(true)
            setValidGenreF(false)
        }

    }

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


    const dispatch = useDispatch();

    const suite = async () => {
        await updateDoc(doc(db, 'users', user.uid), {
            tabInteret: tabInteret
          })
            .then(() => {
                nav.navigate('Photo')
            })
          .catch((error) => {
              alert(error.message)
          })
        
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {/** header */}
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                    <Ionicons name="ios-chevron-back" size={35} color="gray" />
                </TouchableOpacity>

                <View style={{ flexDirection: "column", backgroundColor: "white", height: "97%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingTop: 10 }}>
                    <Text style={{ marginLeft: 15, fontWeight: "bold", fontSize: 30 }}>Qu'est-ce qui t'intéresse?</Text>
                    <Text style={{ marginLeft: 15, fontWeight: "300", fontSize: 15, color: "gray", marginTop: 7 }}>Les gouts, ça ne se discute pas.Dis au monde entier ce qui te passionne.</Text>

                    <View style={{ marginTop: 10, width: WIDTH, borderBottomWidth: 2, backgroundColor: "gray", borderColor: "lightgray" }}></View>
                    <ScrollView style={{ width: WIDTH, height: "80%" }}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", width: WIDTH, backgroundColor: "white", margin: 5, marginBottom: 100 }}>
                            {
                                tableauModal1.map((item, index) => (
                                    <TouchableOpacity onPress={() => ajouterElement(item)} key={index} style={{ backgroundColor: tabInteret.some((element) => element.value === item) ? '#F63A6E' : "white", height: 30, width: "auto", margin: 5, padding: 5, borderWidth: 1, borderRadius: 20, borderColor: "lightgray" }}>
                                        <Text style={{ color: tabInteret.some((element) => element.value === item) ? "white" : "gray", }}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                    <Button title='Voir Tab' color="black" onPress={console.log("tabInteret", tabInteret)}/>
                    <TouchableOpacity onPress={() => tabInteret.length === 5 ? suite():null} style={{ height: 50, width: "70%", backgroundColor: tabInteret.length === 5 ? '#F63A6E' : "lightgray", marginTop: 1, alignContent: "center", alignItems: "center", borderRadius: 25, position: "absolute", bottom: 0, left: '25%' }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT {tabInteret.length}/5</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default CentreInteret

const styles = StyleSheet.create({
    input: {
        flex: 1,
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingLeft: 20,
        borderRadius: 50,
        borderColor: "lightgray",
        borderWidth: StyleSheet.hairlineWidth,
    },
})