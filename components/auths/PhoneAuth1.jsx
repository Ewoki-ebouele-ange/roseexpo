import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useRef } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavContext } from '../../App';
import { CountryPicker } from "react-native-country-codes-picker";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import { auth } from '../../config';
import { PhoneAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../config';



export default function PhoneAuth1({ navigation, route }) {
    const { phoneNumber, setPhoneNumber } = useContext(NavContext)
    const [validFormNumber, setValidFormNumber] = React.useState(false)

    const [verificationId, setVerificationId] = useState(null)
    const recaptchaVerifier = useRef(null)

    const [show, setShow] = useState(false);
    const [showErr, setShowErr] = useState(true);
    const [countryCode, setCountryCode] = useState('');

    function afficherIndice() {
        setShow(true)
        setShowErr(false)
    }

    const suite = async () => {
        const phoneProvider = new PhoneAuthProvider(auth);
        /*const phoneProvider = new firebase.auth.PhoneAuthProvider()
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId())
            setPhoneNumber('')*/

        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
        );
        setVerificationId(verificationId);

        if(verificationId){
            setPhoneNumber(phoneNumber)
            navigation.navigate("PhoneAuth2", {variable: verificationId})
            setPhoneNumber(countryCode+phoneNumber)
        }
    }


    /*function suite() {

        //dispatch verifier Phone Number
        
    }*/
    // const navigation = useNavigation()
    const newLocal = "PhoneAuth2";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <FirebaseRecaptchaVerifierModal 
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
                {/** header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                    <Ionicons name="ios-chevron-back" size={35} color="gray" />
                </TouchableOpacity>

                <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>Est-ce qu'on peut avoir ton numero ?</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 10 }}>
                        <TouchableOpacity onPress={() => afficherIndice()} style={{ paddingBottom: 8, borderBottomWidth: 2, borderColor: "gray", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <AntDesign style={{ marginLeft: 4 }} name="caretdown" size={12} color="black" />
                            <Text style={{ fontWeight: "500", fontSize: 17, }}>{countryCode}{showErr && "+237"} </Text>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 8, borderBottomWidth: 2, borderColor: "gray", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <TextInput
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                style={{ width: WIDTH * 0.5, fontSize: 17, fontWeight: "500",paddingBottom:8}}
                                keyboardType="phone-pad"
                                placeholder="Entrez votre numero..."
                                placeholderTextColor="gray"
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: 70 }}>
                        <Text style={{ fontWeight: "500", color: "gray" }}>Nous allons te texter un code pour confirmer que c'est bien toi. Des tarifs de message et de données peuvent s'appliquer.</Text>
                    </View>
                    <TouchableOpacity onPress={() => phoneNumber.length > 5 ? suite() : null} style={{ height: 50, width: "70%", backgroundColor: phoneNumber.length > 5 ? '#F63A6E' : "lightgray", alignSelf: "center", marginTop: 70, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT</Text>
                    </TouchableOpacity>
                </View>
                <CountryPicker
                    show={show}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                />
            </SafeAreaView>
        </SafeAreaView>
    )
}


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