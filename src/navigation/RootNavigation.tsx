import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../views/home/Home';
import HistoryScreen from '../views/history/History';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: '#393E46'},
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="History"
        options={{headerShown: false}}
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
}

export default Router;
