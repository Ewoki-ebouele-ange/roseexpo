
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
import Animation from './components/auths/Animation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animation1 from './components/auths/Animation1';
import Exemple from './Exemple';
import Animation2 from './components/Animation2';
import { NavContext } from './App';


const Stack = createNativeStackNavigator();

function AppMain() {

  const selectIsLoggedIn1 = useSelector(selectIsLoggedIn);

  const {userData, setUserData, setDistanceMax, setAge, setFumer, setBoir} = useContext(NavContext)
  const [afficherAnimation, setAfficherAnimation] = useState(true);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données au montage du composant
    const fetchData = async () => {
      try {
        // Utilisation de AsyncStorage.getItem pour récupérer la valeur associée à la clé 'user'
        const storedUserData = await AsyncStorage.getItem('@MyApp_user');

        // Mise à jour de l'état avec les données récupérées
        // setUserData(storedUserData);
        setUserData(JSON.parse(storedUserData));

        

      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };


    setTimeout(async () => {
      // Appel de la fonction asynchrone
      fetchData();
    }, 2000)

    setTimeout(async () => {
      setAfficherAnimation(false)

      setDistanceMax(userData.distanceMax)
      setAge(userData.ageMax)
      setFumer(userData.fumes)
      setBoir(userData.bois)
    }, 5000)
  }, []);

 // console.log("userData AppMain22", userData)

  return (
    <React.Fragment>
      {
        afficherAnimation ? <Animation2 />

          :
          <NavigationContainer>
            {
             userData.isLoggedIn ?
                <Stack.Navigator initialRouteName='NavAuth' screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="NavAuth" component={NavAuth} />
                 <Stack.Screen name="tabLayout" component={TabLayout} /> 
                   <Stack.Screen name="Animation" component={Animation} /> 
                </Stack.Navigator>
                :
                <Stack.Navigator initialRouteName='tabLayout' screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="tabLayout" component={TabLayout} />
                  <Stack.Screen name="Animation" component={Animation} />
                   <Stack.Screen name="Animation1" component={Animation1} /> 
                </Stack.Navigator>
            }

          </NavigationContainer>
      }
    </React.Fragment>
  );
}
export default AppMain