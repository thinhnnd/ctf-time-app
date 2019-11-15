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

import { AuthContext } from '../contexts/auth.context';
import API_HELPERS from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class TeamDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        // const evReg = props.team.eventsRegistration;
        const { navigation } = this.props;
        const team = navigation.getParam("team");
        this.state = {
            team: team,
            eventsReg : []
        }
    }

    fetchEventsRegistrationData = async (shortInfoEvents) => {
        try {
            const events = await Promise.all(shortInfoEvents.map(async (event) => {
                let fullInfoEvent = await API_HELPERS.getEvent(event.event);
                const { title, logo } = fullInfoEvent;
                return { ...event, title, logo };

            }));
            this.setState({
                eventsReg: events,
            })
        }
        catch (err) {
            Alert.alert(err.message);
        }

    }
    renderMembers = (mem, index) => {
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
                    borderRadius: 5
                }}
                title={full_name}
                subtitle={`Email: ${email}`}
                titleStyle={{
                    color: _id == this.state.team.leader ? 'red' : 'black'
                }}
            />
        )
    }


    renderJoinedEvent = (event, index) => {
        const { title, logo, grade } = event;
        console.log('event a', event);
        return (
            <ListItem
                key={index}
                leftAvatar={{
                    source: logo && { uri: logo },
                    title: title[0]
                }}
                containerStyle={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 5,
                }}
                title={title}
                subtitle={`Grade: ${grade}`}
            />
        )
    }

    renderListMembers = (members) => {
        return members.map((mems, index) => {
            return this.renderMembers(mems, index);
        })
    }

    renderListEvents = (events) => {
        return events.map((events, index) => {
            return this.renderJoinedEvent(events, index);
        })
    }

    // componentWillMount() {
    //     const evReg = this.props.team.eventsRegistration;
    //     console.log('props team evReg', evReg)
    //     this.setState({ 
    //         eventsRegistration: evReg
    //     })
    // }


    async componentDidMount() {
        const { team } = this.state;
        await this.fetchEventsRegistrationData(team.eventsRegistration);
    }

    render() {
        const { navigation } = this.props;
        const { eventsReg } = this.state;

        const team = navigation.getParam("team");

        return (

            <ScrollView style={styles.container}>
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
                >
                    <View style={styles.statusBar} />

                    <TeamInfo navigate={this.props.navigation.navigate} team={team} />

                    <View style={styles.navBar}>
                        <Text style={styles.nameHeader}>Members</Text>
                    </View>
                    {
                        this.renderListMembers(team.members)
                    }

                    <View style={styles.navBar}>
                        <Text style={styles.nameHeader}>Events Joined</Text>
                    </View>

                    {
                        this.state.eventsReg.length > 0 ? this.renderListEvents(eventsReg): null
                    }

                    <View style={styles.navBar}>
                    </View>

                </SafeAreaView>
            </ScrollView>
        );
    }

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
