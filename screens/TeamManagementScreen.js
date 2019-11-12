import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import API_HELPERS from '../api';
import { AuthContext, useAuthContext } from '../contexts/auth.context';
import TeamList from '../components/Team/TeamsList';
import YourTeam from '../components/Team/YourTeam';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TeamManagementScreen(props) {
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <View style={styles.statusBar} />
                <Text>Add Members</Text>
                

            </SafeAreaView>
        </ScrollView>
    );
}

// TeamManagementScreen.navigationOptions = {
//     header: { title: 'Team Management'}
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff',
        backgroundColor: 'rgba(241, 240, 241, 1)'
    },
    wrapper: {
        marginLeft: 10,
        marginRight: 10
    },
    statusBar: {
        height: 10,
    },
    navBar: {
        height: 60,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignContent: 'center',
    },
    nameHeader: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'normal',
        marginLeft: 20,
    },
});
