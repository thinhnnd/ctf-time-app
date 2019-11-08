import React, { Component } from 'react';
import { Header } from 'react-navigation';
import {
    Alert,
    TextInput,
    View,
    StyleSheet,
    Image,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import API_HELPERS from '../../api';
import DATABASE_HELPERS from '../../database_helpers';

import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin() {
        const { email, password } = this.state;
        const { navigation } = this.props;
        API_HELPERS.login(email, password).then((res) => {
            const { data } = res;
            if (data.token) {
                DATABASE_HELPERS.storeUserToken(data.token);
                DATABASE_HELPERS.setUserInfo(data);
                const from = navigation.getParam('from');
                console.log('from', from);

                from ? navigation.navigate(from) : void 0;
            }

        }).catch((err) => {
            console.log(err);
            Alert.alert('NetworkError', err.message)
        })
    }

    async saveUserData(token) {
        try {
            await SecureStore.setItemAsync('token', JSON.stringify(token));
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/uit-ctf-time.png')} />
                <Input
                    label={'Email'}
                    value={this.state.email}
                    placeholder={'example@address.com'}
                    onChangeText={(email) => this.setState({ email })}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}

                />

                <Input
                    label={'Password'}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'password'}
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                />

                <Button
                    title="Login"
                    titleStyle={styles.button}
                    onPress={this.onLogin}
                />

                <Text>Don't have any account?</Text>

                <Button
                    type="outline"
                    title="REGISTER"
                    titleStyle={styles.button}
                    onPress={() => this.props.navigation.navigate('Register', { title: 'Register ' })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 20,
        marginBottom: 5

    },
    inputWrapper: {
        marginBottom: 10,
    },
    button: {
        textTransform: 'uppercase'
    }
});
