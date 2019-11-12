import React, {useContext} from 'react';
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
import {AuthContext} from '../contexts/auth.context';




export default function TeamDetailScreen(props) {
    const team= props.navigation.getParam("team")



    function renderMembers(mem, index) {
        const { full_name, avatar, email, _id } = mem;
        return (
            <ListItem
                key={index}
                leftAvatar={{ 
                    source: avatar && { uri: avatar },
                    title: full_name[0]
                }}
                containerStyle={{ 
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius:5
                }}
                title={full_name}
                subtitle= {`Email: ${email}`}
                titleStyle={{
                    color: _id == team.leader ? 'red' : 'black' 
                }}
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
        return members.map((mems, index) => {
            return renderMembers(mems, index);
        })
    }
    
    renderListEvents = (events) => {
        return events.map((events, index) => {
            return renderJoinedEvent(events, index);
        })
    }

    // const { team } = props;
    const navigation=props.navigation
    return (
        
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
            >
                <View style={styles.statusBar} />

                <TeamInfo navigate={props.navigation.navigate} team={ team } />

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Members</Text>
                </View>
                {
                    renderListMembers(team.members)
                }

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Events Joined</Text>
                </View>

                <View style={styles.navBar}>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

TeamDetailScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: navigation.getParam("title"),
    }
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
