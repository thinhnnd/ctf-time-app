import React, { Component } from 'react';
import { Header } from 'react-navigation';
import {
    Alert,
    TextInput,
    View,
    StyleSheet,
    Image,
    Text,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import API_HELPERS from '../../api';
import DATABASE_HELPERS from '../../database_helpers';
import { AuthContext } from '../../contexts/auth.context';
import * as SecureStore from 'expo-secure-store';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isPressed: false
        };
        // this.onLogin = this.onLogin.bind(this);
    }
    static contextType = AuthContext;
    validateEmail = email => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }
    onLogin = async () => {
        const { email, password } = this.state;
        if (!email || !password || password.length < 6 || !this.validateEmail(email)) {
            Alert.alert('Invalid credentials', 'Please enter a valid email and password');
            return;
        }
        const { navigation } = this.props;
        this.setState({ isPressed: true });
        API_HELPERS.login(email, password).then((res) => {
            const { data } = res;
            if (data.token) {
                this.context.onLogin(data);
                const from = navigation.getParam('from');
                console.log('from', from);
                from ? navigation.navigate(from) : void 0;
            }

        }).catch((err) => {
            console.log(err);
            Alert.alert(err, err.response.data.message);
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
        if (this.state.isPressed) {
            return (<View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
            </View>)
        }
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/uit-ctf-time.png')} />
                <Input
                    label={'Email'}
                    value={this.state.email.trim()}
                    placeholder={'example@address.com'}
                    onChangeText={(email) => this.setState({ email: email.trim() })}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                    autoCapitalize={'none'}
                />

                <Input
                    label={'Password'}
                    value={this.state.password.trim()}
                    onChangeText={(password) => this.setState({ password: password.trim() })}
                    placeholder={'password'}
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                    autoCapitalize={'none'}
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
