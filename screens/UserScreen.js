import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Button, ListItem, Avatar } from 'react-native-elements';
import { LinearGradient } from '../components/LinearGradient';

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

export default class UserScreen extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         events: [],
    //         isLoading: true
    //     };
    // }

    constructor(props) {
        super(props);
    
        this.state = {
            user: {
                username: 'Username',
                avatar: '',
                description: 'lorem loue piodm ceil moifs lsewi klso ciolj jdoie axesa kcoe keonvj.'
            }
        }
    }

    renderJoinedTeam = (user, index) => {
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

    renderJoinedTeams = () => {
        return USERS.map( (user, index) =>{
            return(
                this.renderJoinedTeam(user, index)
        )})
    }

    render() {
        const { user } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}>
                    <View style={styles.statusBar} />
                    <View style={styles.navBar}>
                        <Text style={styles.nameHeader}>Theresa, 26</Text>
                    </View>
                    <ScrollView style={styles.container}>
                        <View style={{ backgroundColor: '#fff', paddingVertical: 15, borderRadius: 5, marginBottom: 10 }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    title={user.username[0]}
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
                                    { user.username }
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
                                    { user.description }
                                </Text>
                                <Button 
                                    containerStyle={{ 
                                        marginTop: 10,
                                    }} 
                                    title="Change Profile" 
                                />
                            </View>
                        </View>
                        <View> 
                            <Text style={styles.nameHeader}>Team Joined</Text>
                        </View>

                        <View style={ { marginBottom: 15 }}>
                         { this.renderJoinedTeams() }
                        </View>

                        
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

UserScreen.navigationOptions = {
    header: null
};

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
});
