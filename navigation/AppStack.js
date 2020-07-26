import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons, Feather, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen';
import Detail from "../screens/Detail";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile/Profile";
import timer from "../screens/Countdown/timer";
import scheduler from "../screens/Scheduler/scheduler";
import PopularScreen from "../screens/Popular/popularScreen";
import SearchPage from "../screens/Search/searchPage";
import enrollment from "../screens/Search/enrollment";

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
        case 'PopularScreen':
            return 'PopularScreen'
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
                name='PopularScreen'
                component={PopularScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="fire" size={24} color="black" />
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
export default function AppStack(){
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
            <Stack.Screen name="SearchPage" component={SearchPage} options={{ title: 'Search Courses' }} />
            <Stack.Screen name="Enrollment" component={enrollment} options={{ title: 'Enroll Courses' }} />
        </Stack.Navigator>
    );
}
