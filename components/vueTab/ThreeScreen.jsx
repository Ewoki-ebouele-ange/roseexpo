import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import VueNotifs from '../notifs/VueNotifs';
import VueNotifs3 from '../notifs/VueNotifs3';

const Stack = createStackNavigator();

export default function ThreeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="notifs1" component={VueNotifs} options={{
        title: 'Spark',
        headerTitleStyle: { fontWeight: "bold", color: "#F63A6E", fontSize: 25 },
        headerShown:false
      }}/>
      <Stack.Screen name="notifs3" component={VueNotifs3} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
