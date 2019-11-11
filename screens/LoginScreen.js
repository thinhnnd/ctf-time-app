import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Login from '../components/User/Login';
import {AuthContext} from '../contexts/auth.context';

export default function LoginScreen(props) {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <ScrollView style={styles.container}>
            <AppContext.Consumer>
                { console.log(context)}
                <Login navigation={props.navigation} />
            </AppContext.Consumer>
        </ScrollView>
    );
}



LoginScreen.navigationOptions = {
    title: 'Login',
    headerLeft: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff'
    },
});
