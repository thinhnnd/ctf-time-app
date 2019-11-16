import React, { useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
} from 'react-native';
// import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';
import ManagementButton from '../Team/ManagementButton';

import { AuthContext, useAuthContext } from '../../contexts/auth.context'

const SCREEN_WIDTH = Dimensions.get('window').width;


export default function TeamInfo(props) {
    const { user } = useAuthContext();
    // console.log(user);
    const { team } = props;
    team.logo = team.logo ? team.logo : 'https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png';
    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
        >
            <View style={styles.statusBar} />

            <View style={styles.navBar}>
                <Text style={styles.nameHeader}>
                    {team.teamName}
                </Text>
            </View>
            <View>
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
                                source={team.logo && {
                                    uri: team.logo,
                                }}
                                activeOpacity={0.7}
                                avatarStyle={{ borderRadius: 145 / 2 }}
                                title={team.teamName[0]}
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
                                    {team.teamName}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: 300,
                        borderWidth: 0.5,
                        borderColor: 'rgba(222, 223, 226, 1)',
                        marginHorizontal: 20,
                        height: 1,
                        marginVertical: 10
                    }} />
                    {
                        console.log('team info', user && (team.leader == user._id))

                    }
                    {
                        user && (team.leader == user._id) ? <ManagementButton fetchTeam={props.fetchTeam} navigate={props.navigate} user={user} team={props.team} /> : <></>
                    }
                </View>
            </View>
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
