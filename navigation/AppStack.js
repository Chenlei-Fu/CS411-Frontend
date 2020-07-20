import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Detail from "../screens/Detail";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Screen' }} />
      <Stack.Screen name="Detail" component={Detail} options={{ title: 'Detail Screen' }} />
      <Stack.Screen name="Settings" component={Settings} options={{ title: 'Setting Screen' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile Screen' }} />
    </Stack.Navigator>
  );
}
