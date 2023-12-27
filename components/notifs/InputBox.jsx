import { StyleSheet, Text, View ,SafeAreaView,TextInput} from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { addDoc , collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import {db} from "../../config"
import { NavContext } from '../../App';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';




const InputBox = (matchDetails) => {
    const [text,setText]=useState("")
    const isMessage = false;
    const {user} = useContext(NavContext)

var  dt = new Date()
var date = dt.getHours()+":"+dt.getMinutes()

const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

async function schedulePushNotification(sound) {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
  });
  
    await Notifications.scheduleNotificationAsync({
      content: {
        sound
      },
      trigger: { seconds: 1 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

const sendMessage = () => {
  addDoc(collection(db, 'matches', matchDetails.matchDetails.id, 'messages'), {
    timestamp : dt,
    userId: user.uid,
    name : matchDetails.matchDetails.users[user.uid].name,
    photoUrl : matchDetails.matchDetails.users[user.uid].tabImg[0],
    message: text
  })
  schedulePushNotification(true)

  setText("")
}

  return (
    <SafeAreaView style={styles.container}>
        {/* Icon */}
        <AntDesign
         // onPress={pickImage}
          name="plus"
          size={20}
          color="#318CE7"
        />

        {/* Text Input */}
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Entrez votre message..."
          multiline
          numberOfLines={50}
        />

        {/* Icon */}
        <MaterialIcons
          onPress={() => sendMessage()}
          style={styles.send}
          name="send"
          size={16}
          color="white"
        />
      </SafeAreaView>
  )
}

export default InputBox

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "whitesmoke",
        padding: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        position:"absolute",
        bottom:0
      },
      input: {
        flex: 1,
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingLeft:20,
        borderRadius: 50,
        borderColor: "lightgray",
        borderWidth: StyleSheet.hairlineWidth,
      },
      send: {
        backgroundColor: "#318CE7",
        padding: 7,
        borderRadius: 15,
        overflow: "hidden",
        margin:10
      },
    
      attachmentsContainer: {
        alignItems: "flex-end",
      },
      selectedImage: {
        height: 100,
        width: 200,
        margin: 5,
      },
      removeSelectedImage: {
        position: "absolute",
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
      },
})