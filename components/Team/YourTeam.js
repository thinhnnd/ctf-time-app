import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
// import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';
import API_HELPERS from '../../api'

const SCREEN_WIDTH = Dimensions.get('window').width;




export default function YourTeam(props) {
    const { teams, user, token, navigate } = props;
    console.log('user', !user);
    let userTeams;
    if (user) {
         userTeams = user.teams;

    }
    const [teamInfo, setTeam] = useState(teams);
    const [yourTeam, setYourTeam] = useState();



    fetchTeamData = async () => {
        try {
            const data = await API_HELPERS.getTeamDetails(teams[0], token);
            // console.log('data', data);
            setTeam(data);
            // console.log('teamInfo,', teamInfo);
        } catch (err) {
            console.log(err);
        }
    }

    getYourTeam = (teamsList, user) => {
        const result = teamsList.find((team) => {
            return team._id == user.teams[0];
        });

        console.log('team resutl', result)
        return result;
    }

    useEffect(() => {
        if(user) {
            let team = getYourTeam(teams, user);
            console.log('team', team)
            setYourTeam(team)
            console.log('your Team', yourTeam)
        }
    }, [teams, user])

    if(!user) {
        return (<View style={styles.wrapper}>
            <Text style={{ marginBottom: 10 }}>Login to manage your team</Text>
            <Button
                title="Login/Register"
                onPress={() => navigate('Login', { 'from': 'Team' })}
            />
        </View>
        )
    }

    if (userTeams.length === 0) {
        return (
            <View style={{ marginHorizontal: 10}}>
                <Text style={{ marginBottom: 10}}>You are not a member of any teams, create now?</Text>
                <ButtonRNE title="CREATE TEAM" onPress={ () => props.navigate('TeamCreation')} />
            </View>
        );
    }

    if (!yourTeam) {
        return (
            <View>
                <Text>You are not a member of any teams, create now?</Text>
                <ButtonRNE title="CREATE TEAM" onPress={ () => props.navigate('TeamCreation')} />
            </View>
        )
    }


    handleYourTeamDetail = (team, navigate) => {
        // console.log('event handler', event);
        // console.log('press')

        navigate('TeamDetail', { team: team, title: team.teamName });
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}

        >
            <View style={styles.statusBar} />
            <TouchableOpacity onPress={() => handleYourTeamDetail(yourTeam, navigate)}>
                <View
                    style={styles.teamInfo}
                >
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                width={145}
                                height={145}
                                source={yourTeam.logo && {
                                    uri: yourTeam.logo,
                                }}
                                activeOpacity={0.7}
                                avatarStyle={{ borderRadius: 145 / 2 }}
                                title={yourTeam.teamName[0]}
                                overlayContainerStyle={{ backgroundColor: 'black' }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 10,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                        color: 'rgba(98,93,144,1)',
                                        marginLeft: 5,
                                    }}
                                >
                                    {yourTeam.teamName}
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            <View style={styles.navBar}>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        color: '#ffffff',
    },
    teamInfo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        height: 250,
        marginBottom: 10,
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
