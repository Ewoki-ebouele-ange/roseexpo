import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput,ActivityIndicator, TouchableOpacity, ScrollView, FlatList,Image} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../store/authSlice';
import { NavContext } from '../../App';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app'
import { storage } from '../../config';
import {ref , uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { db } from '../../config';
import { doc, updateDoc  } from 'firebase/firestore';

const Photo = ({ navigation, route }) => {

  const dispatch = useDispatch();
    const nav = useNavigation()
    const [tabInteret, setTabInteret] = React.useState([])
    const {genre,dateNaissance,position,metier,ville, interet, email, phoneNumber, mdp,name,categorieRose,age,user}= useContext(NavContext)

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

  const [tabImg, setTabImg] = useState([]);

  const [time, setTime] = useState(0);


    const [hasGalleriePermission, setHasGalleriePermission]= useState(null)
    const [changeImage,setChangeImage]=useState(false)

    useEffect(()=>{
        (async ()=>{
            const gallerieStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleriePermission(gallerieStatus.status === 'granted')
        })()
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setChangeImage(true)
    
        if (!result.canceled) {
          setImage1(result.assets[0].uri);
        }
    };

    const pickImage2 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setChangeImage(true)
    
        if (!result.canceled) {
          setImage2(result.assets[0].uri);
        }
    };
    const pickImage3 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setChangeImage(true)
    
        if (!result.canceled) {
          setImage3(result.assets[0].uri);
        }
    };

    const pickImage4 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setChangeImage(true)
    
        if (!result.canceled) {
          setImage4(result.assets[0].uri);
        }
    };

    if (hasGalleriePermission===false){
    return<Text>No access </Text>
    }

    const metadata = {
        contentType: 'image/jpeg'
    };

    
    const uploadImage = async(imageUri)=>{
        const response = await fetch(imageUri)
        const blobFile = await response.blob()
        const reference = ref(storage,`image/${"pic" + uuidv4()}`)
        const uploadTask = uploadBytesResumable(reference, blobFile, metadata);
        const debutTemps = new Date();

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                // Événement lorsque le téléversement est terminé
                if (snapshot.state ==='running') {
                    const finTemps = new Date();
                    // Temps écoulé en millisecondes
                    const tempsEcoule = finTemps - debutTemps; 
                    console.log(`Le téléversement a pris ${tempsEcoule} millisecondes`);
                    setTime(tempsEcoule)
                }
                
            }, (error) => {
                console.log("error",error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                  console.log('File available at', url);
                  if(url === null){
                      tabImg[0] = 'null'
                      await updateDoc(doc(db, 'users', user.uid), {
                        tabImg: tabImg
                      })
                      .then(() => {
                          //nav.navigate('tabLayout')
                          console.log("Url bien ajoutée")
                      })
                      .catch((error) => {
                          alert(error.message)
                      })
                  } else {
                    tabImg[0] = url
                    await updateDoc(doc(db, 'users', user.uid), {
                      tabImg: tabImg
                    })
                    .then(() => {
                        //nav.navigate('tabLayout')
                        console.log("Url bien ajoutée")
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
                  }
                });
              }
            )
     }


     const uploadImage2 = async(imageUri)=>{
        const response = await fetch(imageUri)
        const blobFile = await response.blob()
        const reference = ref(storage,`image/${"pic" + uuidv4()}`)
        const uploadTask = uploadBytesResumable(reference, blobFile, metadata);
        const debutTemps = new Date();

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                // Événement lorsque le téléversement est terminé
                if (snapshot.state ==='running') {
                    const finTemps = new Date();
                    // Temps écoulé en millisecondes
                    const tempsEcoule = finTemps - debutTemps; 
                    console.log(`Le téléversement a pris ${tempsEcoule} millisecondes`);
                    setTime(tempsEcoule)
                }
                
            }, (error) => {
                console.log("error",error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                  console.log('File available at', url);
                  if(url === null){
                    tabImg[1] = 'null'
                    await updateDoc(doc(db, 'users', user.uid), {
                      tabImg: tabImg
                    })
                      .then(() => {
                          //nav.navigate('tabLayout')
                          console.log("Url bien ajoutée")
                      })
                    .catch((error) => {
                        alert(error.message)
                    })
                  } else {
                    tabImg[1] = url
                  await updateDoc(doc(db, 'users', user.uid), {
                    tabImg: tabImg
                  })
                    .then(() => {
                        //nav.navigate('tabLayout')
                        console.log("Url bien ajoutée")
                    })
                  .catch((error) => {
                      alert(error.message)
                  })
                  }
                });
              }
            )
     }

     const uploadImage3 = async(imageUri)=>{
        const response = await fetch(imageUri)
        const blobFile = await response.blob()
        const reference = ref(storage,`image/${"pic" + uuidv4()}`)
        const uploadTask = uploadBytesResumable(reference, blobFile, metadata);
        const debutTemps = new Date();

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                // Événement lorsque le téléversement est terminé
                if (snapshot.state ==='running') {
                    const finTemps = new Date();
                    // Temps écoulé en millisecondes
                    const tempsEcoule = finTemps - debutTemps; 
                    console.log(`Le téléversement a pris ${tempsEcoule} millisecondes`);
                    setTime(tempsEcoule)
                }
                
            }, (error) => {
                console.log("error",error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                  console.log('File available at', url);
                  if(url === null){
                    tabImg[2] = 'null'
                    await updateDoc(doc(db, 'users', user.uid), {
                      tabImg: tabImg
                    })
                      .then(() => {
                          //nav.navigate('tabLayout')
                          console.log("Url bien ajoutée")
                      })
                    .catch((error) => {
                        alert(error.message)
                    })
                  } else {
                    tabImg[2] = url
                  await updateDoc(doc(db, 'users', user.uid), {
                    tabImg: tabImg
                  })
                    .then(() => {
                        //nav.navigate('tabLayout')
                        console.log("Url bien ajoutée")
                    })
                  .catch((error) => {
                      alert(error.message)
                  })
                  }
                });
              }
            )
     }

     const uploadImage4 = async(imageUri)=>{
        const response = await fetch(imageUri)
        const blobFile = await response.blob()
        const reference = ref(storage,`image/${"pic" + uuidv4()}`)
        const uploadTask = uploadBytesResumable(reference, blobFile, metadata);
        const debutTemps = new Date();

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                // Événement lorsque le téléversement est terminé
                if (snapshot.state ==='running') {
                    const finTemps = new Date();
                    // Temps écoulé en millisecondes
                    const tempsEcoule = finTemps - debutTemps; 
                    console.log(`Le téléversement a pris ${tempsEcoule} millisecondes`);
                    setTime(tempsEcoule)
                }
                
            }, (error) => {
                console.log("error",error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                  console.log('File available at', url);
                  if(url === null){
                    tabImg[3] = 'null'
                    console.log("jhfdjhfjfdkjgkdf")
                    await updateDoc(doc(db, 'users', user.uid), {
                      tabImg: tabImg
                    })
                      .then(() => {
                          //nav.navigate('tabLayout')
                          console.log("Url bien ajoutée")
                      })
                    .catch((error) => {
                        alert(error.message)
                    })
                  } else {
                    tabImg[3] = url
                  await updateDoc(doc(db, 'users', user.uid), {
                    tabImg: tabImg
                  })
                    .then(() => {
                        //nav.navigate('tabLayout')
                        console.log("Url bien ajoutée")
                    })
                  .catch((error) => {
                      alert(error.message)
                  })
                  }
                });
              }
            )
     }


  

     const suite = () => {

      uploadImage(image1)
      uploadImage2(image2)
      uploadImage3(image3)
      uploadImage4(image4)
      const userL = {
          id:user.uid,
          isLoggedIn: true,
          email: email,
          name: name,
          age: age,
          genre: genre,
          dateNaissance: dateNaissance,
          interet: tabInteret,
          position: position,
          phoneNumber:phoneNumber,
          categorieRose:categorieRose,
          metier:metier,
          ville:ville,
          distanceMax:10,
          ageMax: 18,
          distanceMaxBoolean:false,
          ageMaxBoolean: false,
          tabImg :[]
      };

      dispatch(setSignIn(userL))
      console.log("user dans PHOTO", userL)
      nav.navigate('Animation', {page:"tabLayout"})  ///MODIFIER

      setTimeout(()=>{
       // nav.navigate('tabLayout')
    },8000)
  }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {/** header */}
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: "white", height: "5%", position: "absolute", top: 0, width: WIDTH, paddingLeft: 13, paddingTop: 10 }}>
                    <Ionicons name="ios-chevron-back" size={35} color="gray" />
                </TouchableOpacity>

                <View style={{ flexDirection: "column", backgroundColor: "white", height: "97%", position: "absolute", top: "5%", width: WIDTH * 0.8, paddingTop: 10 }}>
                    <Text style={{ marginLeft: 15, fontWeight: "bold", fontSize: 30 }}>Ajoute tes photos .</Text>
                    <Text style={{ marginLeft: 15, fontWeight: "300", fontSize: 15, color: "gray", marginTop: 7 }}>Comme tu le souhaites</Text>

                    <View style={{ marginTop: 10, width: WIDTH, borderBottomWidth: 2, backgroundColor: "gray", borderColor: "lightgray" }}></View>
                    <ScrollView style={{ width: WIDTH, height: "80%" }}>
                        <View style={{ flexDirection: "column",  width: WIDTH, backgroundColor: "white", margin: 5, marginBottom: 100 }}>
                            <View style={{ flexDirection: "row",flexWrap: "nowrap",}}>

                                <TouchableOpacity   onPress={pickImage}  style={{ backgroundColor:'#eee' , height: 180, width: WIDTH/3.3,borderWidth: 1, borderRadius: 10, borderColor: "lightgray",margin:5 }}>
                                    {image1 && <Image source={{ uri: image1 }} style={{ height: 180, width: WIDTH/3.3, borderRadius: 10,}} />}
                                    <FontAwesome style={{position:"absolute",bottom:0,right:0}} name="plus-circle" size={27} color="#F63A6E" />
                                </TouchableOpacity>
                                <TouchableOpacity   onPress={pickImage2}  style={{ backgroundColor:'#eee' , height: 180, width: WIDTH/3.3,borderWidth: 1, borderRadius: 10, borderColor: "lightgray",margin:5 }}>
                                    {image2 && <Image source={{ uri: image2 }} style={{ height: 180, width: WIDTH/3.3, borderRadius: 10,}} />}
                                    <FontAwesome style={{position:"absolute",bottom:0,right:0}} name="plus-circle" size={27} color="#F63A6E" />
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={pickImage3}  style={{ backgroundColor:'#eee' , height: 180, width: WIDTH/3.3,borderWidth: 1, borderRadius: 10, borderColor: "lightgray",margin:5 }}>
                                    {image3 && <Image source={{ uri: image3 }} style={{ height: 180, width: WIDTH/3.3, borderRadius: 10,}} />}
                                    <FontAwesome style={{position:"absolute",bottom:0,right:0}} name="plus-circle" size={27} color="#F63A6E" />
                                </TouchableOpacity>

                            </View>
                            <View style={{ flexDirection: "row",flexWrap: "nowrap",}}>

                                <TouchableOpacity onPress={pickImage4}  style={{ backgroundColor:'#eee' , height: 180, width: WIDTH/3.3,borderWidth: 1, borderRadius: 10, borderColor: "lightgray",margin:5 }}>
                                    {image4 && <Image source={{ uri: image4 }} style={{ height: 180, width: WIDTH/3.3, borderRadius: 10,}} />}
                                    <FontAwesome style={{position:"absolute",bottom:0,right:0}} name="plus-circle" size={27} color="#F63A6E" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </ScrollView>
                        <TouchableOpacity onPress={() => suite()} style={{ height: 50, width: "70%", backgroundColor: '#F63A6E' , marginTop: 1, alignContent: "center", alignItems: "center", borderRadius: 25, position: "absolute", bottom: 0, left: '25%' }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", marginTop: 12, alignSelf: "center" }}>DEMARRER</Text>
                        </TouchableOpacity>
                </View>



            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Photo

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