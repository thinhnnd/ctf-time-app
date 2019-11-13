import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
    TextInput,
    Alert
} from 'react-native';
import Login from '../components/User/Login';
import { Input } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import {useAuthContext} from '../contexts/auth.context';

import API_HELPERS from '../api'


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TeamCreationScreen(props) {
    const { user } = useAuthContext(); 
    const [nameInput, setNameInput ] = useState('');

    async function  handleCreateTeam(teamName) {
        const { token } = user;
        teamName = teamName.trim();
        try {
            res = await API_HELPERS.createNewTeam(token, teamName)
            Alert.alert(res.message);

        }
        catch (err) {
            Alert.alert(err.message)
        }
    }
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
            >
                <View style={styles.statusBar} />

                
                <View style={{ 
                    backgroundColor: '#fff', 
                    paddingVertical: 15,
                     paddingHorizontal: 10, 
                     borderRadius: 5,
                      marginBottom: 10
                     }}>
                    <Text style={{                      
                        marginBottom: 10
                    }}>
                        Team name
                    </Text>
                    <Input containerStyle={{                      
                        marginBottom: 10
                    }} 
                    onChangeText={ (value) => { 
                        setNameInput(value) 
                    }} />
                    <Button title="Submit" onPress={ () => handleCreateTeam(nameInput) } />
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

// TeamCreationScreen.navigationOptions = {
//     header: { title: 'Team Creation'}
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
