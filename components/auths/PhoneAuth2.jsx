import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavContext } from '../../App';

import OTPInputView from '@twotalltotems/react-native-otp-input'

import { auth } from '../../config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const tab = [, 11, 1, 1, , 1, 1, 1]

const PhoneAuth2 = ({ navigation, route }) => {
    const [code, setCode] = React.useState('')
    const [chiffre2, setChiffre2] = React.useState("")
    const [chiffre3, setChiffre3] = React.useState("")
    const [chiffre4, setChiffre4] = React.useState("")
    const [chiffre5, setChiffre5] = React.useState("")
    const [chiffre6, setChiffre6] = React.useState("")
    const [validFormNumber, setValidFormNumber] = React.useState(false)

    const { validPhone, setValidPhone, phoneNumber } = useContext(NavContext)
    const verificationId = route.params?.variable || ''


    const suite = async () => {
        const credential = PhoneAuthProvider.credential(
            verificationId,
            code
        )
        await signInWithCredential(auth, credential)
        .then((userCredentials) => {
            const user = userCredentials.user
            setCode('')
            Alert.alert(
                'Login succesful! welcome'
            )
            console.log('User', user)
            setValidPhone(code)
            navigation.navigate("EmailAuth1")
        })
        .catch((error) => {
            //Show an alert
            alert(error)
        })
        
    }

    /*function suite() {
      //  const tab = [chiffre1, chiffre2, chiffre3, chiffre4, chiffre5, chiffre6]
        //dispatch verfier phone
        
        //  handleVerification()
    }*/
    //const newLocal = "EmailAuth1";
 //   const [code, setCode] = useState(['', '', '', '']);
    const textInputs = Array.from({ length: 4 }, (_, index) => useRef(null));
    const handleCodeChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;

        if (value && index < code.length - 1) {
            textInputs[index + 1].focus();
        }

        setCode(newCode);
    };


    const handleVerification = () => {
        const enteredCode = code.join('');
        console.log('Code entré:', enteredCode);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {/** header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                    <Ionicons name="ios-chevron-back" size={35} color="gray" />
                </TouchableOpacity>

                <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>Entre ton code</Text>
                    <Text style={{ fontWeight: "300", fontSize: 15, marginTop: 20 }}>{phoneNumber}</Text>
                    {/* <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 40 }}>
                        
                        
                           

                         <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>

                            <TextInput

                                value={chiffre1}
                                onChangeText={setChiffre1}
                                //ref={textInputs[index]}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />

                        </View>


                        <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>
                            <TextInput
                                value={chiffre2}
                                onChangeText={setChiffre2}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />
                        </View>

                        <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>
                            <TextInput
                                value={chiffre3}
                                onChangeText={setChiffre3}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />
                        </View>

                        <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>
                            <TextInput
                                value={chiffre4}
                                onChangeText={setChiffre4}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />
                        </View>

                        <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>
                            <TextInput
                                value={chiffre5}
                                onChangeText={setChiffre5}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />
                        </View>

                        <View style={{ marginLeft: 1, borderBottomWidth: 3, borderColor: "gray", alignContent: "center", alignItems: "center", width: 30 }}>
                            <TextInput
                                value={chiffre6}
                                onChangeText={setChiffre6}
                                style={{ width: 15, fontSize: 20, textAlign: "center" }}
                                keyboardType="numeric"
                                placeholder=" "
                                placeholderTextColor="gray"
                                maxLength={1}

                            />
                        </View> 
                    </View> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 40 }}>

                    <OTPInputView
                        style={{ width: '90%', height: 200 }}
                        pinCount={6}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        selectionColor='black'
                        placeholderTextColor='black'
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code) => {
                            setCode(code)
                        }}
                    />
                    </View>

                    <View style={{ marginTop: 70 }}>
                        <Text style={{ fontWeight: "500", color: "gray" }}></Text>
                    </View>
                    <TouchableOpacity onPress={() => suite()} style={{ height: 50, width: "70%", backgroundColor: '#F63A6E', alignSelf: "center", marginTop: 70, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default PhoneAuth2

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
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
})