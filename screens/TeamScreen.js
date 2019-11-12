import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import API_HELPERS from '../api';
import { AuthContext, useAuthContext } from '../contexts/auth.context';
import TeamList from '../components/Team/TeamsList';
import YourTeam from '../components/Team/YourTeam';


const SCREEN_WIDTH = Dimensions.get('window').width;

function rennderUser(user, index) {
    const { name, avatar } = user;
    return (
        <ListItem
            key={index}
            leftAvatar={{ source: { uri: avatar } }}
            containerStyle={{
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 5
            }}
            title={name}
        />
    )
}


function renderJoinedEvent(user, index) {
    const { name, avatar, value } = user;
    return (
        <ListItem
            key={index}
            leftAvatar={{ source: { uri: avatar } }}
            containerStyle={{
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 5,
            }}
            title={name}
            subtitle={`Grade: ${value}`}
        />
    )
}

export default function TeamScreen(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    // const {authData} = useContext(AuthContext);
    const { user } = useAuthContext();

    // function getAllTeams() {

    // }

    fetchData = async () => {
        try {
            const result = await API_HELPERS.getAllTeams();
            setTeams(result);
            setIsLoading(false);

        }
        catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        fetchData();
        console.log('context', user);

    }, []);

    if (isLoading) {
        return (<View style={styles.container, { paddingTop: 20 }}>
            <ActivityIndicator />
        </View>)
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Your Teams</Text>
                </View>
                {
                    !user ?
                        (<View style={styles.wrapper}>
                            <Text style={{ marginBottom: 10 }}>Login to manage your team</Text>
                            <Button
                                title="Login/Register"
                                onPress={() => props.navigation.navigate('Login', { 'from': 'Team' })}
                            />


                        </View>
                        ) : <YourTeam teams={user.teams} />
                }

                <TeamList navigate={props.navigation.navigate} teams={teams} />

                <View style={styles.navBar}>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

TeamScreen.navigationOptions = {
    header: null
};

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
