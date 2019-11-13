import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Alert
} from 'react-native';
import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import API_HELPERS from '../api';
import { AuthContext, useAuthContext } from '../contexts/auth.context';
import { Input, Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;



export default function TeamManagementScreen(props) {
    const [textInput, setTextInput] = useState('')

    const { user } = useAuthContext();

    const team= props.navigation.getParam("team")

    // console.log(team);

    function handleSubmit(val) {
        if(val.length == 0) {
            Alert.alert('Please insert member id or email');
        }
        else {
            // Alert.alert('OK');
            API_HELPERS.addNewMember(user.token, team._id, val).then( (res) => {
                setTextInput('');

            }).catch( err => {
                if(err.message.indexOf("Cast to ObjectId failed for value") == 0) {
                    Alert.alert('User not found!')
                } else {
                    Alert.alert(err.message);
                }
            });
        }

    }
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <View style={styles.statusBar} />
                <Text>Add Members</Text>
                <Input value={textInput} onChangeText = { (value) => setTextInput(value) } />
                <Button title="ADD" onPress={ ()=> handleSubmit(textInput)} />
            
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
