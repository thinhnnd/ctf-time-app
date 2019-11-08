import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ModifyInfo from '../components/User/ModifyInfo';

export default function RegisterScreen(props) {
    return (
        <ScrollView >

            <ModifyInfo navigation={props.navigation} />
        </ScrollView>

    );
}

RegisterScreen.navigationOptions = {
    title: 'Modify Info',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
