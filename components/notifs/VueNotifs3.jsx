import {
    ImageBackground, StyleSheet,
    Text, View, Image, Dimensions, KeyboardAvoidingView, Platform,
    FlatList, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from "dayjs";
const tab = ["E", "R", "E", "R", "E", "R", "R", "E"]
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height
import messages from "../../assets/data/message.json"
import InputBox from './InputBox'
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { NavContext } from '../../App';
import { addDoc , collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../../config';



const VueNotifs3 = ({ route, navigation }) => {

    const { data } = route.params || {}
    const [message, setMessage] = useState([])

    const isMessage = true;
const { user } = useContext(NavContext)

useEffect(() => {
    onSnapshot(query(collection(db, 'matches', data.id, 'messages'),
    orderBy("timestamp", 'desc')), snapShot => setMessage(snapShot.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        }) 
    ))
    )
  }, [data, db])


    const MessageRecu = ({message}) => {
        return (
            <View style={{ flexDirection: "row",  width: WIDTH * 0.8, paddingLeft: 2, gap: 10 }}>
                <Image style={{ height: 30, width: 30, borderRadius: 60, marginRight: 5 }} source={{uri: getMatchedUserInfo(data.users, user.uid)?.tabImg[0]}} />
                <View style={{ backgroundColor: "#eeeeee", borderRadius: 20, padding: 10 }}>
                    <Text style={{ fontFamily: "regular",}}>{message.message}</Text>
                </View>
            </View>
        )
    }

    const MessageEnvoyer = ({ message }) => {
        return (
            <View style={{justifyContent: "flex-end",alignItems:'flex-end', backgroundColor: "#F63A6E", borderRadius: 20,position:'relative', padding: 10, width: WIDTH * 0.8, marginBottom: 10, marginTop: 10, left: 65 }}>
                <Text style={{ fontFamily: "regular", textAlign: "center", }}>{message.message}</Text>
            </View>
        )
    }

    const Mes = ({ message, messageUserId }) => {
        const isMessageRead = false;
        const isMyMsg = () => {
            return messageUserId === user.uid
        }

        var  dt = new Date(message.timestamp.seconds)
// var date = message.timestamp.getHours()+":"+message.timestamp.getMinutes()
var date = dt.getHours()+":"+dt.getMinutes()
        return (
            <TouchableOpacity onPress={() => console.log( date)} style={[styles.containerMes,
            {
                alignSelf: isMyMsg() ? "flex-end" : "flex-start",
                backgroundColor: !isMyMsg() ? "#eee" : "#318CE7",
                borderBottomLeftRadius: !isMyMsg() ? 1 : 30,
                borderBottomRightRadius: !isMyMsg() ? 30 : 1,
            }]}>
                <Text style={{ fontFamily: "regular" }}>{message.message}</Text>

                <View style={{ flexDirection: "row", justifyContent: isMyMsg() ? "flex-end" : "space-evenly" }}>
                    <Text style={[styles.createdMes, { alignSelf: !isMyMsg() ? "flex-start" : "flex-end" }]}>
                        {}
                    </Text>
                    {!isMessageRead ? (
                        <MaterialCommunityIcons style={{ alignSelf: isMyMsg() ? "flex-end" : "flex-start" }} name="read" size={16} color="#5bb6c9" />
                    ) : (
                        <MaterialCommunityIcons style={{ alignSelf: isMyMsg() ? "flex-end" : "flex-start" }} name="check" size={16} color="grey" />
                    )}
                </View>
                {/* <Text style={[styles.createdMes,{alignSelf:!isMyMsg()? "flex-start":"flex-end"}]}>{message.created.slice(11, 16)}</Text> */}
            </TouchableOpacity>
        )
    }
    //    console.log(messages)

    return (
        <>
            {/** header */}
            <View style={{ backgroundColor: "#eee", height: "15%", width: WIDTH, flexDirection: "row", justifyContent: "space-between", paddingTop: 50, top: 0, paddingLeft: 15, paddingRight: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={40} color="gray" />
                </TouchableOpacity>
                <View style={{ flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{uri: getMatchedUserInfo(data.users, user.uid)?.tabImg[0]}} />
                    <Text style={{ fontFamily: "regular", textAlign: "center" }}>{getMatchedUserInfo(data.users, user.uid)?.name}</Text>
                </View>
                <MaterialCommunityIcons name="video" size={30} color="gray" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 1 : 1}
                style={styles.bgK}
            >

                <ImageBackground source={require('../../assets/watzapp.png')} style={styles.bg}>
                    {
                        isMessage ?
                            <FlatList
                                data={message}
                                keyExtractor={(item) => item.id}
                                renderItem={(({ item }) =>                                     
                                <Mes messageUserId={item.userId} key={item.id} message={item}/>
                                 ) }
                                style={styles.list}
                                inverted

                            /> :
                            <View style={{alignSelf: "center", height: HEIGHT * 0.5, width: WIDTH * 0.7, padding: 10,alignContent:"center",alignItems:"center"}}>
                                <View style={{ alignSelf: "center", top: "50%" }}>
                                    <View style={{flexDirection:"row",justifyContent:"center",alignSelf:"center"}}>
                                        <Text style={{fontFamily:"regular",textAlign:"center",color:"gray",fontSize:15}}>Tu as matché avec </Text>
                                        <Text style={{fontFamily:"bold",textAlign:"center",color:"gray",fontSize:17}}>{getMatchedUserInfo(data.users, user.uid).name}</Text>
                                    </View>

                                    <Image style={{ height: 180, width: 180, borderRadius: 80, }} source={{uri: getMatchedUserInfo(data.users, user.uid)?.tabImg[0]}} />
                                </View>
                            </View>
                    }

                    <InputBox matchDetails={data}/>
                </ImageBackground>
            </KeyboardAvoidingView>
        </>

    )
}

export default VueNotifs3

const styles = StyleSheet.create({
    bg: {
        flex: 1,
     //   height:HEIGHT*2
     paddingBottom:50
    },
    bgK: {
        flex: 1,
        height:HEIGHT*2,
       // paddingBottom:100
    },
    list: {
        padding: 10,
      //  height:HEIGHT*2
    },
    containerMes: {
        maxWidth: "80%",
        margin: 5,
        padding: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1
    },
    textMes: {

    },
    createdMes: {
        color: "gray",
        fontSize: 10
    }
})