import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons, Feather, FontAwesome5, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen';
import Detail from "../screens/Detail";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile/Profile";
import timer from "../screens/Countdown/timer";
import scheduler from "../screens/Scheduler/scheduler";
import PopularScreen from "../screens/Popular/popularScreen";
import SearchPage from "../screens/Search/searchPage";
import enrollment from "../screens/Search/enrollment";
import newWindow from "../screens/Scheduler/newWindow";
import Favorite from "../screens/Search/Favorite";
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
                    backgroundColor: '#6286A5'
                }
            }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name='PopularScreen'
                component={PopularScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="fire" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="meh" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
export default function AppStack(){
    return (
        <Stack.Navigator initialRouteName='Home'
                         screenOptions={{
                             gestureEnabled: true,
                             headerStyle: {
                                 backgroundColor: '#101010'
                             },
                             headerTitleStyle: {
                                 fontWeight: 'bold'
                             },
                             headerTintColor: '#80A1B1',
                             headerBackTitleVisible: false
                         }}>
            <Stack.Screen
                name="Home"
                component={MainTabNavigator}
                options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),

                })}
            />
            <Stack.Screen name="Detail" component={Detail} options={{ title: 'Detail Screen' }} />
            <Stack.Screen name="Timer" component={timer} options={{ title: 'Countdown Screen' }} />
            <Stack.Screen name="Scheduler" component={scheduler} options={{ title: 'Scheduler Screen' }} />
            <Stack.Screen name="SearchPage" component={SearchPage} options={{ title: 'Search Courses' }} />
            <Stack.Screen name="Enrollment" component={enrollment} options={{ title: 'Enroll Courses' }} />
            <Stack.Screen name="newWindow" component={newWindow} options={{ title: 'remark Courses' }} />
            <Stack.Screen name="Favorite" component={Favorite} options={{ title: 'Favorites' }} />
        </Stack.Navigator>
    );
}
