import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

import API_HELPERS from '../api';
import { AuthContext, useAuthContext } from '../contexts/auth.context';
import TeamList from '../components/Team/TeamsList';
import YourTeam from '../components/Team/YourTeam';


const SCREEN_WIDTH = Dimensions.get('window').width;



export default class TeamScreen extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        // user =  { user } = useAuthContext();
        this.state = {
            isLoading: true,
            refreshing: false,
            teams: [],
            yourTeam: null,
            user: undefined,
            fetching: false
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchData().then(() => {
            // console.log('onRefresh', this.state.teams)
            this.setState({ refreshing: false });

        });
    }

    fetchData = async () => {
        try {
            this.setState({
                fetching: true
            })
            const result = await API_HELPERS.getAllTeams();
            this.setState({
                teams: result,
                fetching: false,
                isLoading: false
            });
        }
        catch (err) {
            console.error(err);
        }

    }

    async componentDidMount() {
        await this.fetchData();
        const { user } = this.context;
        this.setState({ user });
    }

    getYourTeam = (teamsList, user) => {
        const result = teamsList.find((team) => {
            return team._id == user.teams[0];
        });

        return result;
    }

    render() {
        const { navigation } = this.props;
        let {user} = this.context;
        const { isLoading, teams, refreshing } = this.state;
        if (isLoading) {
            return (<View style={styles.container, { paddingTop: 20 }}>
                <ActivityIndicator />
            </View>)
        }
        else
            return (
                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
                >
                    <SafeAreaView
                        style={{ flex: 1 }}
                    >
                        <View style={styles.statusBar} />
                        <View style={styles.navBar}>
                            <Text style={styles.nameHeader}>Your Teams</Text>
                        </View>
                        <YourTeam fetching={this.state.fetching} fetchTeamsData={this.fetchData} navigate={navigation.navigate} user={user} teams={teams} />
                        <TeamList fetching={this.state.fetching} fetchTeamsData={this.fetchData} navigate={navigation.navigate} teams={teams} />

                        <View style={styles.navBar}>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            );
    }

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
