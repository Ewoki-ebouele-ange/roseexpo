import {
    Dimensions, Image, SafeAreaView,
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View, KeyboardAvoidingView, Platform
  } from 'react-native'
  import React from 'react'
  import { Ionicons } from '@expo/vector-icons';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import InputScrollView from 'react-native-input-scroll-view';
  
  const WIDTH = Dimensions.get('screen').width
  const HEIGHT = Dimensions.get('screen').height
  
  const tab = ["E", "R", "E", "R", "E", "R", "R", "E"]
  
  const VueNotifs2 = ({ route, navigation }) => {
    const { data } = route.params || {}

    console.log('data', data)
    const MessageRecu = () => {
      return (
        <View style={{ justifyContent: "center", flexDirection: "row", left: 15, width: WIDTH * 0.8, paddingLeft: 10 }}>
          <Image style={{ height: 30, width: 30, borderRadius: 60, alignSelf: "center", marginRight: 5 }} source={require("../../assets/couple/cine.jpeg")} />
          <View style={{ backgroundColor: "#eeeeee", borderRadius: 20, padding: 10 }}>
            <Text style={{ fontFamily: "regular", textAlign: "center", }}>salut leThis guide points to the various navigation components available in React Native. If you are getting started with navigation, you will probably want to use React Navigation. React Navigation provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS. niang xadikoi ???</Text>
          </View>
        </View>
      )
    }
  
    const MessageEnvoyer = () => {
      return (
        <View style={{ backgroundColor: "gray", borderRadius: 20, padding: 10, justifyContent: "center", width: WIDTH * 0.8, marginBottom: 10, marginTop: 10, left: 65 }}>
          <Text style={{ fontFamily: "regular", textAlign: "center", }}>salut le niang xadikoi This guide points to the various navigation components available in React Native. If you are getting started with navigation, you will probably want to use React Navigation. React Navigation provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS.???</Text>
        </View>
      )
    }
  
    const ZoneTexte = () => {
      return (
        <View style={{ position: "absolute", bottom: 0, height: "8%", width: WIDTH }}>
          <TextInput multiline={true} placeholder='Entrer le message' placeholderTextColor="gray" style={{ backgroundColor: "white", alignSelf: "center", height: "70%", width: WIDTH * 0.9, borderRadius: 20, marginTop: 10 }} />
          <Text style={{ position: "absolute", right: 45, top: 22, fontFamily: "bold", color: "gray" }}>Envoyé</Text>
        </View>
      )
    }
    return (
      <SafeAreaView style={{ flex: 1, height: HEIGHT, width: WIDTH, }}>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, height: HEIGHT, width: WIDTH, }}>
  
          {/** header */}
          <View style={{ backgroundColor: "#eee", position: "absolute", height: "15%", width: WIDTH, flexDirection: "row", justifyContent: "space-between", paddingTop: 50, top: 0, paddingLeft: 15, paddingRight: 15 }} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={40} color="gray" />
            </TouchableOpacity>
            <View style={{ flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
              <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{uri: getMatchedUserInfo(data.users, user.uid)?.tabImg[0]}} />
              <Text style={{ fontFamily: "regular", textAlign: "center" }}>{getMatchedUserInfo(data.users, user.uid)?.name}</Text>
            </View>
            <MaterialCommunityIcons name="video" size={30} color="gray" />
          </View>
  
          {/**corps */}
  
          <ScrollView style={{ height: "91%", width: WIDTH, backgroundColor: "white", position: "absolute", bottom: 0, flexDirection: "column", }}>
            {tab.map((value, index) => (
              value == "E" ?
                <MessageRecu key={index} /> : <MessageEnvoyer key={index} />
            ))}
            <ZoneTexte />
  
          </ScrollView>
  
        </KeyboardAvoidingView>
  
      </SafeAreaView>
    )
  }
  
  export default VueNotifs2
  
  const styles = StyleSheet.create({})