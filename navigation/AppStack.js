import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen';
import Detail from "../screens/Detail";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import timer from "../screens/Countdown/timer";
import scheduler from "../screens/Scheduler/scheduler";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'Home'

    switch (routeName) {
        case 'Home':
            return 'Home'
        case 'Profile':
            return 'Profile'
        case 'Setting':
            return 'Setting'
    }
}


function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#101010',
                style: {
                    backgroundColor: '#ffd700'
                }
            }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='ios-home' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='ios-person' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name='Setting'
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={({ route }) => ({
              headerTitle: getHeaderTitle(route)
          })}
      />
      <Stack.Screen name="Detail" component={Detail} options={{ title: 'Detail Screen' }} />
      <Stack.Screen name="Timer" component={timer} options={{ title: 'Countdown Screen' }} />
      <Stack.Screen name="Scheduler" component={scheduler} options={{ title: 'Scheduler Screen' }} />
    </Stack.Navigator>
  );
}
