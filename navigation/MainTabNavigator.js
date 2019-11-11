import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TeamScreen from '../screens/TeamScreen';
import UserScreen from '../screens/UserScreen';
import CTFEventScreen from '../screens/CTFEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserModifyScreen from '../screens/UserModifyScreen';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

HomeStack.path = '';

const TeamStack = createStackNavigator(
    {
        Team: TeamScreen,
        Login: LoginScreen,
        Register: RegisterScreen,
    },
    config
);

TeamStack.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
};

TeamStack.path = '';

const UserStack = createStackNavigator(
    {
        User: { screen: UserScreen },
        Login: { screen: LoginScreen },
        Register: RegisterScreen,
        ModifyUserInfo: UserModifyScreen
    },
);

UserStack.navigationOptions = {
    tabBarLabel: 'User',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};




UserStack.path = '';

// CTFEventScreen
const CTFEventStack = createStackNavigator({
    CTFEvent: CTFEventScreen,
    EventDetail: { screen: EventDetailScreen },
    Login: { screen: LoginScreen }
}, config)
CTFEventStack.navigationOptions = {
    tabBarLabel: 'Events',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-information' : 'md-information'} />
    )
}
CTFEventStack.path = '';


const tabNavigator = createBottomTabNavigator({
    HomeStack,
    CTFEventStack,
    TeamStack,
    UserStack,
});

tabNavigator.path = '';

export default tabNavigator;
