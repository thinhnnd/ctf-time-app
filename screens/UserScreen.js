import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/auth.context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserProfile from '../components/User/UserProfile';

export default class UserScreen extends Component {
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
    static contextType = AuthContext;
    render() {
        // const { user } = this.state;
        const { user } = this.context;
        if (!user) {
            return (
                <ScrollView contentContainerStyle={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={styles.notifierContainer}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Login', { from: 'User' });
                        }} style={styles.notifierLink}>
                            <Text style={styles.notifierLinkText}>
                                Hey Guest, please login at here!!!
                  </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
        }
        else
            return <UserProfile />;
    }
}

UserScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
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
