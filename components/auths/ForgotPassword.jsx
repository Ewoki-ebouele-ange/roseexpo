import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Formik } from 'formik';
import React,{useState} from 'react'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import * as Yup from 'yup';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

import { auth } from '../../config'
import { sendPasswordResetEmail } from "firebase/auth";



const loginSchema = Yup.object().shape({
    email: Yup.string().email('Entrez un email valide!').required('L\'adresse email est obligatoire!'),
});



const ForgotPassword = ({navigation, route}) => {

    const handlePasswordReset = async (values) => {
        const { email } = values
      
    await sendPasswordResetEmail(auth, email).then(() => {
          alert('Consulter votre boîte mail')
          navigation.navigate('Accueil')
    })
    .catch((error)=>{
        alert(error.message)
    })
}

    const [show, setShow] = useState(false);

    return (
        <Formik
                initialValues={{ email: '',password:'' }}
                validateOnMount={true}
                onSubmit={values => console.log(values.password)}
                validationSchema={loginSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
                <View style={{ display:'flex',justifyContent:'center',padding: 40, marginTop:100 }}>
                    <Text style={{fontSize:30, paddingBottom:20, fontFamily:'bold'}}>Entrer votre adresse email</Text>
                    <View style={{ marginBottom:10,}}>
                        <FloatingLabelInput
                            label={'Email'}
                            labelStyles={{ alignSelf: 'center', paddingTop:2, color: "#000", }}
                            // isPassword
                            keyboardType='email-address'
                            togglePassword={show}
                            containerStyles={{ borderColor: "#F63A6E", borderWidth: 2, height: 60, borderRadius: 20, alignContent: "center", padding: 10, }}
                        
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        // style={{borderTopColor:'#F63A6E'}}
                        />
                        {touched.email && errors.email && <Text style={{color:'red',fontSize:15,fontFamily:"regular"}}>{errors.email}</Text>}
                        <Text></Text>
                    </View>
                    <Text style={{fontSize:15, paddingBottom:20}}>Un message sera envoyé à votre adresse email.</Text>

                    {/** login button */}
                    <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity disabled={!isValid} onPress={() => handlePasswordReset(values)} style={[styles(isValid).loginButton, styles(isValid).shadow]}>
                            <Text style={{ textAlign: "center", fontSize: 20, fontFamily: 'bold', color: "white", }}>Validé</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
  )
}

export default ForgotPassword

const styles =(isValid)=> StyleSheet.create({
    brandview: {
    flex: 1,
justifyContent: "center",
alignItems: "center"
},
brandviewText: {
    color: "#ffffff",
fontSize: 40,
fontWeight: "bold",
textTransform: "uppercase"
},
bottomView: {
    flex: 1.5,
backgroundColor: "#ffffff",
bottom: 50,
borderTopStartRadius: 60,
borderTopRightRadius: 60,
// height: "40%"
},
bgK: {
    flex: 1,
height: HEIGHT * 0.5,
// paddingBottom:100
//  backgroundColor:"red"
},
forgot: {
    height: 50,
marginTop: 20,
flexDirection: "row"
},
loginButton:{
backgroundColor:isValid?'#F63A6E':"gray",
alignSelf:'center',
width:WIDTH/2,
justifyContent:"center",
height:50,
borderRadius:30,
},
shadow:{
    shadowOffset:{width:1,height:10},
shadowOpacity:0.4,
shadowRadius:3,
elevation:15
}
})