import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, ListItem, Button } from 'react-native-elements';
import { AuthContext } from '../../contexts/auth.context';
import { LinearGradient } from '../LinearGradient';
//import { renderUser, renderJoinedEvent } from '../../shared/team.share';
import API_HELPERS from '../../api';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 120;

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
    }
]
const renderJoinedTeam = team => {
    const { _id, members, teamName, leader, eventsRegistration } = team;
    console.log("members", members);
    return (
        <ListItem
            key={_id}
            leftAvatar={{ source: { uri: 'https://image.flaticon.com/icons/png/512/2180/2180075.png' } }}
            containerStyle={{
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 5,
            }}
            title={teamName}
            subtitle={`Leader ` + leader}
        />
    )
}

const MyTeams = ({ teams }) => {
    return teams.map(team => renderJoinedTeam(team))
}
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }
    async componentDidMount() {
        await this.fetchTeam();
    }
    static contextType = AuthContext;

    fetchTeam = async () => {
        const { user } = this.context;
        const teamsPromise = [];
        try {
            user.teams.forEach(team => {
                const teamData = API_HELPERS.getTeamDetails(team, user.token);
                teamsPromise.push(teamData);
            });
        } catch (error) {
            const { data } = error.response;
            Alert.alert('Error fetching team details', data.message);
        }
        const teams = await Promise.all(teamsPromise);
        this.setState({ teams });
    }
    render() {
        const { user } = this.context;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}>
                    <View style={styles.statusBar} />
                    <View style={styles.navBar}>
                        <Text style={styles.nameHeader}>{user.full_name}</Text>
                    </View>
                    <ScrollView style={styles.container}>
                        <View style={{ backgroundColor: '#fff', paddingVertical: 15, borderRadius: 5, marginBottom: 10 }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    title={user.email}
                                    source={require('../../assets/images/user-default.png')}
                                    style={{
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE,
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    marginHorizontal: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 26,
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {user.email}
                                </Text>

                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 20,
                                    width: SCREEN_WIDTH - 80,
                                    marginLeft: 40,
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        color: 'black',
                                        fontWeight: 'normal',
                                        textAlign: 'justify'
                                    }}
                                >
                                    {'lorem loue piodm ceil moifs lsewi klso ciolj jdoie axesa kcoe keonvj.'}
                                </Text>
                                <Button
                                    containerStyle={{
                                        marginTop: 5,
                                    }}
                                    title="Change Profile"
                                />
                                <Button
                                    containerStyle={{
                                        marginTop: 5,
                                    }}
                                    type="outline"
                                    title="Logout"
                                    onPress={() => this.context.onLogout()}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.nameHeader}>Team Joined</Text>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <MyTeams teams={this.state.teams} />
                        </View>


                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
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
        fontSize: 22,
        textAlign: 'center',
    },
    infoTypeLabel: {
        fontSize: 15,
        textAlign: 'right',
        color: 'rgba(126,123,138,1)',
        fontWeight: 'normal',
        paddingBottom: 10,
    },
    infoAnswerLabel: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'normal',
        paddingBottom: 10,
    },
    notifierContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    notifierLink: {
        paddingVertical: 15,
    },
    notifierLinkText: {
        fontSize: 20,
        color: '#2e78b7',
    },
});
