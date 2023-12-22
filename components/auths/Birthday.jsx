import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useContext } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { NavContext } from '../../App';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
// const tab = [1, 11, 1, 1, , 1, 1, 1]

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';



const loginSchema = Yup.object().shape({
    username: Yup.string().required('le nom est obligatoire!'),
    ville: Yup.string().required('la ville est obligatoire!'),
    metier: Yup.string().required('le metier est obligatoire!'),
    // password: Yup.string().min(5, ({ min }) => `Au moins ${min} caractères`).required('Mot de pass obligatoire!')
});

import { db } from '../../config';
import { doc, setDoc } from 'firebase/firestore';


const Birthday = ({ navigation, route }) => {
    const [chiffre1, setChiffre1] = React.useState("")
    const [chiffre2, setChiffre2] = React.useState("")
    const [chiffre3, setChiffre3] = React.useState("")
    const [chiffre4, setChiffre4] = React.useState("")
    const [chiffre5, setChiffre5] = React.useState("")
    const [chiffre6, setChiffre6] = React.useState("")
    const [chiffre7, setChiffre7] = React.useState("")
    const [chiffre8, setChiffre8] = React.useState("")
    const [validFormNumber, setValidFormNumber] = React.useState(false)
    const [show, setShow] = useState(false);

    const { dateNaissance, setDateNaissance, age, setAge, user, setUser, phoneNumber, setPhoneNumber, metier, setMetier, ville, setVille, name, setName } = useContext(NavContext)
    const [emailAttribue, setEmailAttribue] = useState(false);
    /*function suite() {
        //const tab = [chiffre1, chiffre2, chiffre3, chiffre4, chiffre5, chiffre6, chiffre7, chiffre8]
        //dispatch verfier phone
        setDateNaissance(tab)
        navigation.navigate(newLocal)
    }
    const newLocal = "Genre";

    console.log("user birth", user)*/

    //-------------------------------------------------

    const suite = (values) => {
        setName(values.username)
        setMetier(values.metier)
        setVille(values.ville)
        console.log('object', dateNaissance)
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            email: user.email,
            phoneNumber: phoneNumber,
            dateNaissance: dateNaissance,
            name: values.username,
            metier: values.metier,
            ville: values.ville,
            age: age
        })
            .then(() => {
                navigation.navigate('Genre')
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    //-------------------------------------------------

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateBirt, setDateBirt] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
        const year = date.getFullYear();
        setAge(2023 - date.getFullYear())
        const formattedDate = `${day}:${month}:${year}`;
        setDateNaissance(formattedDate)
        //  console.warn("A date has been picked: ", dateBirt);
        hideDatePicker();
    };

    return (
        <Formik
            initialValues={{ username: '', ville: '', metier: '' }}
            validateOnMount={true}
            //  onSubmit={values => console.log(values)}
            validationSchema={loginSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                        {/** header */}
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                            <Ionicons name="ios-chevron-back" size={35} color="gray" />
                        </TouchableOpacity>



                        <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 30 }}>Informations personnelles</Text>
                            {/* <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 40 }}>
                    <TextInput
                        value={chiffre1}
                        onChangeText={setChiffre1}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="Y"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <TextInput
                        value={chiffre2}
                        onChangeText={setChiffre2}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="Y"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <TextInput
                        value={chiffre3}
                        onChangeText={setChiffre3}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="Y"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <TextInput
                        value={chiffre4}
                        onChangeText={setChiffre4}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="Y"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>/</Text>

                    <TextInput
                        value={chiffre5}
                        onChangeText={setChiffre5}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="M"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <TextInput
                        value={chiffre6}
                        onChangeText={setChiffre6}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="M"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />

                    
                    <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>/</Text>

                    <TextInput
                        value={chiffre7}
                        onChangeText={setChiffre7}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="D"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />
                    <TextInput
                        value={chiffre8}
                        onChangeText={setChiffre8}
                        style={{ width: 25, fontSize: 20, textAlign: "center", borderBottomWidth: 3 }}
                        keyboardType="numeric"
                        placeholder="D"
                        placeholderTextColor="gray"
                        maxLength={1}

                    />


                </View> */}
                            {/** information */}



                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                                {/** header */}

                                <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>

                                    <View style={{ flexDirection: "column", justifyContent: "flex-start", marginTop: 10 }}>

                                        <View style={{ marginBottom: 10, }}>
                                            <FloatingLabelInput
                                                label={'Nom d\'utilisateur'}
                                                labelStyles={{ alignSelf: 'center', paddingTop: 20, color: "#000", paddingBottom: 8 }}
                                                // isPassword
                                                keyboardType='email-address'
                                                togglePassword={show}
                                                containerStyles={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}

                                                onChangeText={handleChange('username')}
                                                onBlur={handleBlur('username')}
                                                value={values.username}
                                            // style={{borderTopColor:'#F63A6E'}}
                                            />
                                            {touched.username && errors.username && <Text style={{ color: 'red', fontSize: 10, fontFamily: "regular" }}>{errors.username}</Text>}
                                            <Text></Text>

                                        </View>

                                        <View style={{ marginBottom: 10, }}>
                                            <FloatingLabelInput
                                                label={'Ville'}
                                                labelStyles={{ alignSelf: 'center', paddingTop: 20, color: "#000", paddingBottom: 8 }}
                                                // isPassword
                                                keyboardType='email-address'
                                                togglePassword={show}
                                                containerStyles={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}

                                                onChangeText={handleChange('ville')}
                                                onBlur={handleBlur('ville')}
                                                value={values.ville}
                                            // style={{borderTopColor:'#F63A6E'}}
                                            />
                                            {touched.ville && errors.ville && <Text style={{ color: 'red', fontSize: 10, fontFamily: "regular" }}>{errors.ville}</Text>}
                                            <Text></Text>

                                        </View>

                                        <View style={{ marginBottom: 10, }}>
                                            <FloatingLabelInput
                                                label={'Metier'}
                                                labelStyles={{ alignSelf: 'center', paddingTop: 20, color: "#000", paddingBottom: 8 }}
                                                // isPassword
                                                keyboardType='email-address'
                                                togglePassword={show}
                                                containerStyles={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}

                                                onChangeText={handleChange('metier')}
                                                onBlur={handleBlur('metier')}
                                                value={values.metier}
                                            // style={{borderTopColor:'#F63A6E'}}
                                            />
                                            {touched.metier && errors.metier && <Text style={{ color: 'red', fontSize: 10, fontFamily: "regular" }}>{errors.metier}</Text>}
                                            <Text></Text>

                                        </View>

                                        <View style={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}>
                                            <Text style={{ fontWeight: "300", fontSize: 15, marginTop: "auto", }}>{dateNaissance}</Text>
                                        </View>


                                        <View style={{ flexDirection: "column", justifyContent: "space-around", marginTop: 40 }}>


                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={handleConfirm}
                                                onCancel={hideDatePicker}
                                            />
                                            <TouchableOpacity onPress={showDatePicker} >
                                                <Text style={[{ textAlign: "center", fontSize: 20, fontFamily: "regular" }, styles.shadow]}>Selectionner une date.</Text>
                                            </TouchableOpacity>

                                        </View>


                                    </View>

                                </View>
                            </SafeAreaView>




                            {/** fin informations */}

                            {/* <Text style={{ fontWeight: "300", fontSize: 15, marginTop: 20 }}>Ton profil affiche ton age, pas ta date de naissance.</Text> */}

                            <View style={{ marginTop: 70 }}>
                                <Text style={{ fontWeight: "500", color: "gray" }}></Text>
                            </View>
                            <TouchableOpacity onPress={() => suite(values)} style={{ height: 50, width: "70%", backgroundColor: '#F63A6E', alignSelf: "center", marginTop: 70, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
                                <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
            )}
        </Formik>
    )
}

export default Birthday

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
    shadow: {
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 15
    }
})