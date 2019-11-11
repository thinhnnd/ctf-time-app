import React, {useState, useEffect} from 'react';
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
import {AuthContext} from '../contexts/auth.context';
import TeamList from '../components/Team/TeamsList';


const USERS = [
    {
        name: 'Johh Smith',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        value: '164',
    },
    {
        name: 'Sarah Parker',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
        value: '203',
        positive: true,
    },
    {
        name: 'Paul Allen',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
        value: '464',
        positive: true,
    },
    {
        name: 'Terry Andrews',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
        value: '80',
        positive: false,
    },
]

const logo = 'https://g2e-gamers2mediasl.netdna-ssl.com/wp-content/themes/g2-esports/library/img/G2_Red_Eye_Dark_background.png'
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
                borderRadius:5
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
                borderRadius:5,
            }}
            title={name}
            subtitle= {`Grade: ${value}`}
        />
    )
}

renderListUsers = () => {
    return USERS.map((user, index) => {
        return rennderUser(user, index);
    })
}

renderListEvents = () => {
    return USERS.map((user, index) => {
        return renderJoinedEvent(user, index);
    })
}

export default function TeamScreen(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);

    // function getAllTeams() {

    // }

    fetchData = async () => {
        try {
            const result = await API_HELPERS.getAllTeams();
            console.log(result);
            setTeams(result);
            setIsLoading(false);
            console.log(isLoading);
        }
        catch (err) {
            console.error(err);
        }

    }
 
    useEffect(() => {
        fetchData();
    }, []);

    console.log('render');
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
        marginLeft: 15,
        marginRight: 15
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
