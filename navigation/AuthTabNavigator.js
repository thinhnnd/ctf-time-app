import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});


const LoginStack = createStackNavigator(
    {
        Login: LoginScreen,
    },
    config
);

LoginStack.navigationOptions = {
    tabBarLabel: 'Home',
};

LoginStack.path = '';

const RegisterStack = createStackNavigator(
    {
        Register: RegisterScreen,
    },
    config
);

RegisterStack.navigationOptions = {
    tabBarLabel: 'Register',
};

RegisterStack.path = '';

const authNavigator = createBottomTabNavigator({
    LoginStack,
    RegisterStack,
});

authNavigator.path = '';

export default authNavigator;
