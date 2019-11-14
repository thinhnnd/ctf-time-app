import React, { useState, useEffect } from 'react';
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
    const [textInput, setTextInput] = useState('');
    const [usersList, setUsersList] = useState([]);

    const { user } = useAuthContext();

    const team= props.navigation.getParam("team");

    fetchUsersData = async (token) => {
        try {
            res = await API_HELPERS.getUsersHaveNoTeam(token);
            setUsersList(res);
        } catch(err) {
            console.log(err.message);
        }

    }

    useEffect( () => {
        console.log('Team managemet')
        fetchUsersData(user.token);
    }, [])

    renderUsersList = (users) => {
        return users.map((userInfo, index) => 
            <ListItem
                key={index}
                leftAvatar={{
                    source: userInfo.avatar && { uri: userInfo.avatar },
                    title: userInfo.full_name[0]
                }}
                containerStyle={{
                    marginTop: 10,
                    borderRadius: 5
                }}
                title={userInfo.full_name}
                team={userInfo.email}
                rightElement={ <Button onPress={ () => addNewMember(user.token, team._id, userInfo._id)} title="Add" />}
    /> )
    }
    // console.log(team);

    async function addNewMember(token, teamId, userIdOrEmail) {
        try {
            await API_HELPERS.addNewMember(token, teamId, userIdOrEmail);
            fetchUsersData(token);
            Alert.alert('Add member successfully');

        }
        catch (err) {
            if(err.message.indexOf("Cast to ObjectId failed for value") == 0) {
                Alert.alert('User not found!')
            } else {
                Alert.alert(err.message);
            }        
        }
    }


    async function handleSubmit(val) {
        if(val.length == 0) {
            Alert.alert('Please insert member id or email');
        }
        else {
            // Alert.alert('OK');
            await addNewMember(user.token, team._id, val);
            setTextInput('');

            // API_HELPERS.addNewMember(user.token, team._id, val).then( (res) => {
            //     setTextInput('');
            //     Alert.alert('Add member successfully');
            // }).catch( err => {
            //     if(err.message.indexOf("Cast to ObjectId failed for value") == 0) {
            //         Alert.alert('User not found!')
            //     } else {
            //         Alert.alert(err.message);
            //     }
            // });
        }

    }
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1}}
            >
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Available User</Text>
                </View>                
                <Input containerStyle={{marginBottom: 10}} value={textInput} onChangeText = { (value) => setTextInput(value) } />
                <Button  style={{marginBottom: 10}} title="ADD" onPress={ ()=> handleSubmit(textInput)} />
                <View style={{marginVertical: 10}} />
                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Available User</Text>
                </View>
                {
                    usersList.length != 0 ? renderUsersList(usersList) : null
                }
            </SafeAreaView>
        </ScrollView>
    );
}

TeamManagementScreen.navigationOptions = {
    title: 'Add members',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff',
        backgroundColor: 'rgba(241, 240, 241, 1)',
        paddingHorizontal: 10,
    },
    wrapper: {
        marginLeft: 10,
        marginRight: 10
    },
    nameHeader: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'normal',
        marginLeft: 20,
    },
});
