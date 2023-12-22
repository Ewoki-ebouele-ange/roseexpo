import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MatchPage from '../otherscreens/MatchPage';
import OneScreen from './OneScreen';

const Stack = createStackNavigator();

const FiveScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OneScreen" component={OneScreen} options={{headerShown:false}} />
      <Stack.Screen name="Match" component={MatchPage} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default FiveScreen