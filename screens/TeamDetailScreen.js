import React from 'react';
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
import TeamInfo from '../components/Team/TeamInfo';

const SCREEN_WIDTH = Dimensions.get('window').width;




export default function TeamDetailScreen(props) {

    function rennderUser(user, index) {
        const { full_name, avatar } = user;
        return (
            <ListItem
                key={index}
                leftAvatar={{ source: { uri: avatar } }}
                containerStyle={{ 
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius:5
                }}
                title={full_name}
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
    
    renderListMembers = (members) => {
        return members.map((user, index) => {
            return rennderUser(user, index);
        })
    }
    
    renderListEvents = (events) => {
        return events.map((user, index) => {
            return renderJoinedEvent(user, index);
        })
    }

    // const { team } = props;
    const team= props.navigation.getParam("team")
    const navigation=props.navigation
    return (
        
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
            >
                <View style={styles.statusBar} />

                <TeamInfo navigation={navigation} team={ team } />

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Members</Text>
                </View>
                {
                    renderListMembers(team.members)
                }

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Events Joined</Text>
                </View>

                {
                }

                <View style={styles.navBar}>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff',
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
