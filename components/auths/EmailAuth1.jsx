import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native'
import React, { useContext } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavContext } from '../../App';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { auth } from '../../config'
import { createUserWithEmailAndPassword } from "firebase/auth";


const loginSchema = Yup.object().shape({
    email: Yup.string().email('Entrez un email valide!').required('L\'adresse email est obligatoire!'),
    password: Yup.string().min(5, ({ min }) => `Au moins ${min} caractères`).required('Mot de pass obligatoire!')
});

const EmailAuth1 = ({navigation, route}) => {
    const {email, setEmail} = useContext(NavContext)
    const {user, setUser} = useContext(NavContext)
    const [show, setShow] = useState(false);
    const [emailAttribue, setEmailAttribue] = useState(false);

    const newLocal = "Bienvenue";

    const suite = (values) => {
        console.log("email", values.email)
        console.log("pass", values.password)
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredentials => {
            const userCre = userCredentials.user;
            setUser(userCre)
            setEmail(values.email)
            navigation.navigate(newLocal)
        if (!setEmailAttribue) {
            navigation.navigate(newLocal)
        }
        })
        .catch(error => alert(error.message))
    }

    return (

        <Formik
            initialValues={{ email: '',password:'' }}
            validateOnMount={true}
            validationSchema={loginSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
            <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
            <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
                {/** header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                    <Ionicons name="ios-chevron-back" size={35} color="gray" />
                </TouchableOpacity>

                <View style={{ alignSelf: "center", flexDirection: "column", justifyContent: "flex-start", backgroundColor: "white", height: "95%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingLeft: 13, paddingTop: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 10 }}>Ton adresse courriel ?</Text>
                    <Text style={{ fontWeight: "300", fontSize: 15, marginTop: 10 }}>Ne perds pas l'acces à ton compte, valide avec ton email.</Text>
                    {emailAttribue && <Text style={{color:'red',fontSize:10,fontFamily:"regular",}}>!!! Email deja attribué !!!</Text>}
                    <View style={{ flexDirection: "column", justifyContent: "flex-start", marginTop: 10 }}>

                    <View style={{ marginBottom:10,}}>
                        <FloatingLabelInput
                            label={'Email'}
                            labelStyles={{ alignSelf: 'center', paddingTop: 20, color: "#000",paddingBottom:8 }}
                            // isPassword
                            keyboardType='email-address'
                            togglePassword={show}
                            containerStyles={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}
                        
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        // style={{borderTopColor:'#F63A6E'}}
                        />
                        {touched.email && errors.email && <Text style={{color:'red',fontSize:10,fontFamily:"regular"}}>{errors.email}</Text>}
                        <Text></Text>
                                            
                    </View>
                    <View style={{ borderColor: "red" }}>
                        <FloatingLabelInput
                            label={'Password'}
                            labelStyles={{ alignSelf: 'center', paddingTop: 20, color: "#000", }}
                            isPassword
                            togglePassword={show}
                            containerStyles={{ borderBottomColor: "gray", borderBottomWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, marginTop: 20 }}
                            //value={cont}
                            //onChangeText={value => setCont(value)}
                            customShowPasswordComponent={<Feather name="eye" size={24} color="black" />}
                            customHidePasswordComponent={<Feather name="eye-off" size={24} color="black" />}

                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        
                            // style={{borderTopColor:'#F63A6E'}}
                        />
                        {touched.password && errors.password && <Text style={{color:'red',fontSize:10,fontFamily:"regular"}}>{errors.password}</Text>}
                        <Text></Text>
                    </View>

                    </View>
                    <View style={{ marginTop: 70 }}>
                        <Text style={{ fontWeight: "500", color: "gray" }}></Text>
                    </View>
                    <TouchableOpacity disabled={!isValid} onPress={() => suite(values)} style={{ height: 50, width: "70%", backgroundColor: isValid ? '#F63A6E' : "lightgray", alignSelf: "center", marginTop: 70, alignContent: "center", alignItems: "center", borderRadius: 25 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>SUIVANT</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </SafeAreaView>
            )}
        </Formik>
    )
}

export default EmailAuth1

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