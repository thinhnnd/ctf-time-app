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
    },
    {
        name: 'Terry Andrews',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
        value: '80',
        positive: false,
    },
]

const logo = 'https://g2e-gamers2mediasl.netdna-ssl.com/wp-content/themes/g2-esports/library/img/G2_Red_Eye_Dark_background.png'
const SCREEN_WIDTH = Dimensions.get('window').width;


function rennderUser1(user, index) { // event team joined
    const { name, avatar } = user;
    return (
        <View
            key={index}
            style={{
                height: 60,
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                alignItems: 'center',
                flexDirection: 'row'
            }}
        >
            <View style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{ marginLeft: 15 }}>
                    <Avatar
                        small
                        round
                        source={{ uri: avatar }}
                        activeOpacity={0.7}
                    />
                    <Text
                        style={{
                            fontWeight: 'normal',
                            fontSize: 15,
                            marginLeft: 10,
                            color: 'gray',
                        }}
                    >
                        {name}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function rennderUser(user, index) {
    const { name, avatar } = user;
    return (
        <ListItem
            key={index}
            leftAvatar={{ source: { uri: avatar } }}
            containerStyle={{ 
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius:5
            }}
            title={name}
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

renderListUsers = () => {
    return USERS.map((user, index) => {
        return rennderUser(user, index);
    })
}

renderListEvents = () => {
    return USERS.map((user, index) => {
        return renderJoinedEvent(user, index);
    })
}

export default function TeamScreen(props) {


    return (
        <ScrollView style={styles.container}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(241, 240, 241, 1)' }}
            >
                <View style={styles.statusBar} />

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>G2 Team</Text>
                </View>
                <View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            alignItems: 'center',
                            marginHorizontal: 10,
                            height: 250,
                            marginBottom: 10,
                        }}
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
                                    source={{
                                        uri: logo,
                                    }}
                                    activeOpacity={0.7}
                                    avatarStyle={{ borderRadius: 145 / 2 }}
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
                                            marginLeft: -15,
                                        }}
                                    >
                                        G2
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
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Button
                                    title="View Profile"
                                    buttonStyle={{
                                        height: 33,
                                        width: 120,
                                        backgroundColor: 'rgba(222, 223, 226, 1)',
                                        borderRadius: 5,
                                    }}
                                    titleStyle={{
                                        fontWeight: 'normal',
                                        fontSize: 13,
                                        color: 'gray',
                                    }}
                                    onPress={() => console.log('aye')}
                                    underlayColor="transparent"
                                />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Button
                                    title="Add User"
                                    buttonStyle={{
                                        height: 33,
                                        width: 120,
                                        backgroundColor: 'rgba(113, 154, 112, 1)',
                                        borderRadius: 5,
                                    }}
                                    titleStyle={{
                                        fontWeight: 'normal',
                                        fontSize: 13,
                                        color: 'white'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Members</Text>
                </View>
                {
                    renderListUsers()
                }

                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Events Joined</Text>
                </View>

                {
                    renderListEvents()
                }

                <View style={styles.navBar}>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

TeamScreen.navigationOptions = {
    header: null
};

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
