import { View, Text, Image, Dimensions, KeyboardAvoidingView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import InputBoxMatch from './InputBoxMatch'
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Modal } from 'react-native'
import { NavContext } from '../../App'



const MatchPage = ({userSwiped,loggedInProfile}) => {

    const navigation = useNavigation()
    const {params} = useRoute()

  //  const { userSwiped } = params
const {user,modalMatch, setModalMatch}= useContext(NavContext)


    return (
        <Modal visible={modalMatch} >
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 1 : 1}
            style={styles.bgK}
        >
            <ImageBackground resizeMode='cover' style={{ width: WIDTH, height: HEIGHT, flex: 1 }} >
                <View style={{ backgroundColor: "transparent", width: WIDTH,position:"absolute",top:70}}>
                    <TouchableOpacity onPress={() => {setModalMatch(false) }}>
                        <Entypo name="cross" size={60} color="white" />
                    </TouchableOpacity>
                </View>
                {/* <Image style={{alignSelf:"center",width:WIDTH}} source={require("../../assets/matchlogo.png")} /> */}
                <Text style={{ alignSelf: "center", fontSize: 60, fontFamily: "bold", color: "#32de84", marginVertical: HEIGHT * 0.4, position: "absolute" }}> MATCH !!!</Text>
                <InputBoxMatch userSwiped={userSwiped} />

            </ImageBackground>

        </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    bg: {
        flex: 1,
        //   height:HEIGHT*2
        paddingBottom: 50
    },
    bgK: {
        flex: 1,
        height: HEIGHT * 2,
        // paddingBottom:100
    },
    list: {
        padding: 10,
        //  height:HEIGHT*2
    }
})
export default MatchPage