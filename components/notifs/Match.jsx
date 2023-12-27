import { View, Text, TouchableOpacity, Image,Dimensions } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { NavContext } from '../../App';
import { useNavigation } from '@react-navigation/native';
const WIDTH = Dimensions.get('screen').width
import { AntDesign } from '@expo/vector-icons';

const Match = ({ matchDetails }) => {

    const navigation = useNavigation()
    const { user } = useContext(NavContext)
    const [MatchedUserInfo, setMatchedUserInfo] = useState(null)

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    },[matchDetails, user])

    return (
        <TouchableOpacity onPress={() => navigation.navigate('notifs3', { data: matchDetails })} style={{ flexDirection: "column", justifyContent: "center" }}>
            <View style={{ height: 140, width: 100, marginLeft: 5, alignItems: "center", borderWidth: 2, borderColor: "gold", borderRadius: 10 }}>
                <Image source={{uri: MatchedUserInfo?.tabImg[0]}} style={{ height: 137, width: 98, borderRadius: 10 }} />
                <AntDesign style={{ position: "absolute", bottom: 0 }} name="heart" size={24} color="gold" />
            </View>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>{MatchedUserInfo?.name.slice(0, 10) + "..."}</Text>
        </TouchableOpacity>
    )
}

export default Match