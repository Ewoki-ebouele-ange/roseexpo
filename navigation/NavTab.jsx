// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, SafeAreaView, useColorScheme } from 'react-native';
import { COLORS } from '../assets/constants';
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const HEIGHT = Dimensions.get("screen").height
const WIDTH = Dimensions.get("screen").width

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Link } from '@react-navigation/native';
import { NavContext } from '../App';
import Colors from '../constants/Colors';
import OneScreen from '../components/vueTab/OneScreen';
import TwoScreen from '../components/vueTab/TwoScreen';
import ThreeScreen from '../components/vueTab/ThreeScreen';
import FourScreen from '../components/vueTab/FourScreen';
import FiveScreen from '../components/vueTab/FiveScreen';

// import ModalScreen from '../modal';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const modalMenu = useContext(NavContext)?.modalMenu
  const setModalMenu = useContext(NavContext)?.setModalMenu


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tab.Screen
        name="index"
        component={OneScreen}
        options={{
          title: 'Spark',
          headerTitleStyle: { fontWeight: "bold", color: "#F63A6E", fontSize: 25 },
          tabBarIcon: ({ color }) => <FontAwesome name="tint" color={color} size={28} style={{ marginBottom: -3 }} />,
           headerRight: () => (
           
            <Pressable onPress={()=>{if (setModalMenu) {
              setModalMenu(!modalMenu);
            }console.log(modalMenu)}}>
                <AntDesign style={{alignSelf:"center", marginRight:20,marginTop:4}} name="menu-fold" size={24} color="gray" />
            </Pressable>
           ),
        }}
      />
      <Tab.Screen
        name="two"
        component={TwoScreen}
        options={{
          title: 'search',
          headerTitleStyle: { fontWeight: "bold", color: "#F63A6E", fontSize: 25 },
          tabBarIcon: ({ color }) => <FontAwesome name="search" color={color} size={28} style={{ marginBottom: -3 }} />,
        }}
      />

      <Tab.Screen
        name="three"
        component={ThreeScreen}
        options={{
          headerShown:false,
        tabBarIcon: ({ color }) => <FontAwesome name="wechat" color={color} size={28} style={{ marginBottom: -3 }} />,
        }}
      />

      <Tab.Screen
        name="four"
        component={FourScreen}
        options={{
          title: 'profil',
          // headerShown:false,
          tabBarIcon: ({ color }) => <FontAwesome name="user" color={color} size={28} style={{ marginBottom: -3 }} />,
          header: () => (
            <React.Fragment>
              <SafeAreaView style={{ height: 25, backgroundColor: "white", width: WIDTH }}></SafeAreaView>
              <SafeAreaView style={{ height: 35, backgroundColor: "white", width: WIDTH , flexDirection: "row", justifyContent: "space-between", marginLeft: 10, }}>
                <View style={{ height: 25, width: "auto",marginTop:9 }}>
                  <Text style={{ fontWeight: "bold", color: "#F63A6E", fontSize: 25,marginLeft:10 }}>Spark</Text>
                </View>
                <View style={{width: 85,flexDirection:"row",justifyContent:"space-between",marginTop:9 }}>
                      <Ionicons style={{marginLeft:10,}} name="settings-sharp" size={25} color="gray" />
                </View>
              </SafeAreaView>
            </React.Fragment>

          )
        }}
      />
    </Tab.Navigator>
  );
}
