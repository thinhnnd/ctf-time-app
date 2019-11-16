import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
    Alert
} from 'react-native';
import { ListItem } from 'react-native-elements';
import TeamInfo from '../components/Team/TeamInfo';

import { AuthContext } from '../contexts/auth.context';
import API_HELPERS from '../api';
import EventItemMenu from '../components/Shared/EventItemMenu';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class TeamDetailScreen extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        // const evReg = props.team.eventsRegistration;
        const { navigation } = this.props;
        const team = navigation.getParam("team");
        let fetching = navigation.getParam("fetching")
        this.state = {
            team: team,
            eventsReg: [],
            fetching: fetching
        }
    }

    fetchTeam = async () => {
        try {
            const { user } = this.context;
            let teamDetail = await API_HELPERS.getTeamDetails(user.token, this.state.team._id);
            console.log('teamDetail', teamDetail);
            this.setState({
                team: teamDetail
            })

        } catch (err) {
            console.log(err);   
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

    deleteUserInTeam = async (token, teamId, userId) => {
        try {
            await API_HELPERS.deleteMember(token, teamId, userId);
            Alert.alert('Remove Successfully');

            const fetchTeams = this.props.navigation.getParam("fetchTeamsData");
            fetchTeams();
            this.fetchTeam();

        } catch (err) {
            Alert.alert(err.message);
        }
    }

    cancelEvent = async (token, teamId, eventId) => {
        // console.log('token', token, 'teamId', teamId, 'eventId', eventId)
        try {
            const res = await API_HELPERS.deleteRegistrationEvent(token, teamId, eventId);
            Alert.alert('Remove Successfully');
            const { team } = this.state;

            await this.fetchEventsRegistrationData(team.eventsRegistration);
            fetchTeams();
            this.fetchTeam();

        } catch (err) {
            Alert.alert(err.message);
        }
    }

    renderMembers = (mem, index) => {
        const { full_name, avatar, email, _id, } = mem;
        const { user } = this.context;
        const { team } = this.state;
        // console.log('user', user);
        // console.log('team', team);
        let delUser;
        if (user && (user._id = team.leader)) {
            delUser = <Button titleStyle={{ fontSize: 10 }} title="Remove" onPress={() => this.deleteUserInTeam(user.token, team._id, _id)} />
        }
        return (
            <ListItem
                key={index}
                leftAvatar={{
                    source: avatar && { uri: avatar } || require('../assets/images/user-default.png'),
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
                    color: _id == team.leader ? 'red' : 'black'
                }}

                rightElement={(user && team.leader !== _id) ? delUser : undefined}
            />
        )
    }


    renderJoinedEvent = (eventItem, index) => {
        const { title, logo, grade, _id, event } = eventItem;

        const { user } = this.context;
        const { team } = this.state;

        // const evItem = team.eventsRegistration.filter(evReg => evReg._id == _id);

        // console.log('include ', team.eventsRegistration.includes(_id));

        if (user && (user._id = team.leader) && !grade) {
            delEvent = <Button
                titleStyle={{ fontSize: 10 }} title="Cancel"
                onPress={() => this.cancelEvent(user.token, team._id, event)} />
        }
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
                rightElement={
                    (user && team.leader == user._id && user.teams[0] == team._id) ||
                        (user && user.role == "admin") ?
                        <EventItemMenu team={team} event={eventItem} /> :
                        undefined
                }
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
        const { eventsReg, team } = this.state;

        // const team = navigation.getParam("team");

        return (

            <ScrollView style={styles.container}>
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
                >
                    <View style={styles.statusBar} />

                    <TeamInfo fetchTeam={this.fetchTeam} navigate={this.props.navigation.navigate} team={team} />

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
                        this.state.eventsReg.length > 0 ? this.renderListEvents(eventsReg) : null
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
