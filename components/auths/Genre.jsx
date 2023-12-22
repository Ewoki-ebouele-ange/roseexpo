import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavContext } from '../../App';

import { db } from '../../config';
import { doc, updateDoc  } from 'firebase/firestore';

const Genre = ({navigation, route}) => {
    const [genre1, setGenre1] = React.useState("")
    const [validGenreF, setValidGenreF] = React.useState(false)
    const [validGenreH, setValidGenreH] = React.useState(false)
    const [validGenre, setValidGenre] = React.useState(false)

    const {genre, setGenre,user} = useContext(NavContext)

    function selectGenre(gr){
        setGenre(gr)
        setValidGenre(true)
       if(gr==="F"){
        setValidGenreF(true)
        setValidGenreH(false)
    }
       else{
        setValidGenreH(true)
        setValidGenreF(false)
    }

    }


    const suite = async () => {
       await updateDoc(doc(db, 'users', user.uid), {
          genre: genre
        })
          .then(() => {
            navigation.navigate('CentreInteret')
          })
        .catch((error) => {
            alert(error.message)
        })
    }

  const newLocal = "CentreInteret";

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
        <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
            {/** header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                <Ionicons name="ios-chevron-back" size={35} color="gray" />
            </TouchableOpacity>

            <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>A quel genre d'identifies-tu?</Text>
                <View style={{ flexDirection: "column", justifyContent: "center", marginTop: 10 }}>
                    <TouchableOpacity onPress={()=>selectGenre("F")} style={{ height: 50, borderWidth: 1, borderColor: "lightgray", borderRadius: 20, width: "100%", marginTop: 15,backgroundColor: validGenreF ? '#F63A6E' : "white",  }}>
                        <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",marginTop:12,color:validGenreF?"white":"gray"}}>Femme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>selectGenre("H")} style={{ height: 50, borderWidth: 1, borderColor: "lightgray", borderRadius: 20, width: "100%", marginTop: 15,backgroundColor: validGenreH ? '#F63A6E' : "white",  }}>
                        <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",marginTop:12,color:validGenreH?"white":"gray"}}>Homme</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>suite()} style={{ height: 50, width: "70%", backgroundColor: validGenre ? '#F63A6E' : "lightgray", alignSelf: "center", marginTop: 70, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT</Text>
                </TouchableOpacity>
                </View>

                
            </View>
        </SafeAreaView>
        </SafeAreaView>
    )
}

export default Genre

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