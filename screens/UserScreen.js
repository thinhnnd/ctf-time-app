import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import Register from '../components/User/Register';

export default function UserScreen(props) {
    return (
        <ScrollView style={styles.container}>
            <Button
                title="LOGIN/REGISTER"
                onPress={() => props.navigation.navigate('Login')}
            />
        </ScrollView>
    );
}

UserScreen.navigationOptions = {
    title: 'User',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
