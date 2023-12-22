import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../config'
import { collection, doc, setDoc, onSnapshot, getDocs, query, where, getDoc, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import { NavContext } from '../../App';
import Message from './Message';
import Match from './Match';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';



// import type { NativeStackScreenProps } from '@react-navigation/native-stack';


const WIDTH = Dimensions.get('screen').width


const VueNotifs = ({ route, navigation }) => {

    const { user } = useContext(NavContext)
    const [matches, setMatches] = useState([])
    const [link, setLink] = useState('')
    const [MatchedUsers, setMatchedUsers] = useState(null)

    


    useEffect(() => {
        onSnapshot(
            query(
                collection(db, 'matches'),
                where('usersMatched', 'array-contains', user.uid)
            ),
            (snapshot) => setMatches(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            ),
        )
        
    }, [user])

    return (
        <ScrollView>
            <ScrollView style={{ height: "auto", marginTop: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                    <View style={{ height: 140, width: 100, marginLeft: 5, alignItems: "center", borderWidth: 2, borderColor: "gold", borderRadius: 10 }}>
                        <Image source={{uri: matches[0]?.users[user.uid]?.tabImg[0]}} style={{ height: 137, width: 98, borderRadius: 10 }} />
                        <AntDesign style={{ position: "absolute", bottom: 0 }} name="heart" size={24} color="gold" />
                        <View style={{ position: "absolute", top: "35%", width: 40, height: 40, borderRadius: 50, backgroundColor: "gold", alignItems: "center", alignContent: "center" }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", marginTop: "25%" }}>{matches.length}</Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>Likes</Text>
                </View>
                {matches.length > 0 ? (
                    <FlatList
                        //style={{height:'50%'}}
                        data={matches}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Match matchDetails={item} />}
                    />) : (
                    <View></View>
                )}
            </ScrollView>

            <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 30, fontSize: 21 }}>Messages</Text>
            {matches.length > 0 ? (
                <FlatList
                    //style={{height:'50%'}}
                    data={matches}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Message matchDetails={item} />}
                />) : (
                <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: 'center' }}>No matches at the moment</Text>
                </View>
            )}

            {/*
                    matches.map((value, index) => (<Message value={value} key={index} />))
            */}

        </ScrollView>
    )
}

export default VueNotifs

const styles = StyleSheet.create({})