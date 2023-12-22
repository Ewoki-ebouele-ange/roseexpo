// In App.js in a new project

import React, { useEffect, useState, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import 'react-native-gesture-handler'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font"
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import NavAuth from './navigation/NavAuth';
import TabLayout from './navigation/NavTab';
import Example from './components/otherscreens/Example';
import { Provider, useSelector } from 'react-redux';
import { stare } from './store/stare';
import { selectIsLoggedIn } from './store/authSlice';
import AppMain from './AppMain';

const Stack = createNativeStackNavigator();
export const NavContext = createContext()

function App() {

  const [modalMenu, setModalMenu] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [genre, setGenre] = useState("")
  const [dateNaissance, setDateNaissance] = useState([])
  const [interet, setInteret] = useState([])
  const [categorieRose, setCategorieRose] = useState("")
  const [position, setPosition] = useState([])
  const [photo, setPhoto] = useState([])
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [validPhone, setValidPhone] = useState(0)  //code de verification entre par le user
  const [email, setEmail] = useState('')
  const [mdp, setMdp] = useState('')
  const [user, setUser] = useState({})
  const [tabInteret, setTabInteret] = React.useState([])
  const [errorEmailMdp, setErrorEmailMdp] = useState(false)

  const [modalMatch, setModalMatch] = useState(false)
  

  const [ville, setVille] = useState('')
  const [metier, setMetier] = useState('')
  const [location, setLocation] = useState()
  const [id, setId] = useState()


  const [distanceMax, setDistanceMax] = useState(5)
  const [distanceMaxBoolean, setDistanceMaxBoolean] = useState(false)
  const [ageMax, setAgeMax] = useState(18)
  const [ageMaxBoolean, setAgeMaxBoolean] = useState(false)
  const [boir, setBoir] = useState(false)
  const [fumer, setFumer] = useState(false)

  const [userData, setUserData]=useState(null)
  const [userData2, setUserData2]=useState(null)


  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  })

  const onLayoutRootViewv = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  if (!fontsLoaded) {
    return null
  }

  // const username = useSelector(selectUserName);

  return (
    <Provider store={stare}>
      <NavContext.Provider value={{
        modalMenu, setModalMenu, genre, setGenre, categorieRose, setCategorieRose,
        dateNaissance, setDateNaissance, interet, setInteret, position, setPosition, photo, setPhoto, phoneNumber,
        setPhoneNumber, validPhone, setValidPhone, email, setEmail, mdp, setMdp, name, setName,
        errorEmailMdp, setErrorEmailMdp, age, setAge, user, setUser, tabInteret, setTabInteret, metier, setMetier, ville, setVille,
        distanceMax, setDistanceMax, ageMax, setAgeMax, boir, setBoir, fumer, setFumer, distanceMaxBoolean, setDistanceMaxBoolean,
        ageMaxBoolean, setAgeMaxBoolean, location, setLocation,modalMatch, setModalMatch,userData, setUserData,
        userData2, setUserData2, id, setId
      }}>
       <AppMain />
      </NavContext.Provider>
    </Provider>
  );
}
{/* <NavContext.Provider value={{ modalMenu, setModalMenu }}> */ }
export default App;