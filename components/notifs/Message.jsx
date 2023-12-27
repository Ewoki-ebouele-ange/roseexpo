import { View, Text, TouchableOpacity, Image,Dimensions } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { NavContext } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
const WIDTH = Dimensions.get('screen').width



const Message = ({ matchDetails }) => {

    const navigation = useNavigation()
    const { user } = useContext(NavContext)
    const [MatchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState('')


    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    },[matchDetails, user])

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')
            ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
        )
    },[matchDetails, db])

    console.log('MatchedUserInfo', MatchedUserInfo)

    return (
        <TouchableOpacity onPress={() => navigation.navigate('notifs3', { data: matchDetails })}>
            <View style={{ margin: 10, flexDirection: "row", justifyContent: "flex-start" }}>
                <Image style={{ height: 80, width: 80, borderRadius: 50 }} source={{uri: MatchedUserInfo?.tabImg[0]}} />
                <View style={{ flexDirection: "column", alignContent: "center", alignSelf: "center", marginLeft: 10, gap:15 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>{MatchedUserInfo?.name}</Text>
                    <Text style={{ fontWeight: "bold", textAlign: "center", color: "gray" }}>{lastMessage || 'Recently active, match now!'}</Text>
                </View>
            </View>
            <View style={{ marginTop: 7, backgroundColor: "gray", height: 1, width: WIDTH * 1, marginLeft:80 }}></View>
        </TouchableOpacity>
    )
}

export default Message