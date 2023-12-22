import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View,Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Animation1({ navigation, route }) {
  const animation = useRef(null);

  const rout = useRoute();
  const { page } = rout.params || {};

  const nav = useNavigation()

  useEffect(()=>{
    animation.current?.play();

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
    // Appel de la fonction asynchrone
    fetchData();

     setTimeout(async()=>{
     //if(!userData.isLogged) { navigation.navigate('Acceuil')} 
     // else  { navigation.navigate('tabLayout')}
     navigation.navigate('Acceuil')
   },5000)
   },[])

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/anime2.json')}
      />
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View> */}
      <Text>spark animation 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
 //   backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});