import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Login from '../components/User/Login';
import {AuthContext} from '../contexts/auth.context';

export default function LoginScreen(props) {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <ScrollView style={styles.container}>
            <Login navigation={props.navigation} />
        </ScrollView>
    );
}



LoginScreen.navigationOptions = {
    title: 'Login',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff'
    },
});
