import React, { useState, useEffect } from 'react';
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
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import API_HELPERS from '../../api';
// import {AuthContext} from '../../contexts/auth.context';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default function TeamsList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState(props.teams);

    // function getAllTeams() {

    // }

    // console.log('props.team', props.teams);

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
        // fetchData();
        setTeams(props.teams)
    }, [props.teams]);

    handleTeamDetail = (team, navigate) => {
        // console.log('event handler', event);

        navigate('TeamDetail', { team: team, title: team.teamName });
    }

    renderTeam = (team, index) => {
        const { teamName, avatar } = team;
        return (
            <ListItem
                key={index}
                leftAvatar={{
                    source: avatar && { uri: avatar },
                    title: teamName[0]
                }}
                containerStyle={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 5
                }}
                title={teamName}
                team={team}
                onPress={() => handleTeamDetail(team, props.navigate)}
            />
        )
    }

    renderListTeams = (listTeams) => {
        return listTeams.map((team, index) => {
            return renderTeam(team, index);
        })
    }

    return (
        <>
            <View style={styles.navBar}>
                <Text style={styles.nameHeader}>List Teams</Text>
            </View>
            {
                renderListTeams(teams)
            }

            <View style={styles.navBar}>
            </View>
        </>
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
