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
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import {
    Input,
    Button,
} from 'react-native-elements';
import API_HELPERS from '../../api';
import { AuthContext } from '../../contexts/auth.context';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            full_name: '',
            password: '',
            passwordRetype: '',
            isPressed: false
        };
    }
    static contextType = AuthContext;
    onRegister = async () => {
        try {
            const { email, full_name, password, passwordRetype } = this.state;
            if (!email || !full_name || !password || password.length < 6 || password !== passwordRetype) {
                Alert.alert('Invalid fields', 'Please enter a valid value');
                return;
            }
            this.setState({ isPressed: true });
            const response = await API_HELPERS.registerUser(email, full_name, password);
            const { data } = response;
            if (data) {
                const { onLogin } = this.context;
                onLogin(data);
                this.props.navigation.navigate('User');
            }
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
            console.log(error.response.data.message);
        }

    }

    render() {
        if (this.state.isPressed) {
            return (<View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
            </View>)
        }
        return (
            <View style={styles.container} >
                <Image source={require('../../assets/images/uit-ctf-time.png')} />
                <Input
                    label={'Email'}
                    value={this.state.email}
                    placeholder={'example@address.com'}
                    onChangeText={(email) => this.setState({ email: email.trim() })}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                    autoCapitalize={'none'}

                />

                <Input
                    label={'Full Name'}
                    value={this.state.full_name}
                    placeholder={'Tran Van B'}
                    onChangeText={(full_name) => this.setState({ full_name })}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                />

                <Input
                    label={'Password'}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password: password.trim() })}
                    placeholder={'password'}
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                    autoCapitalize={'none'}

                />


                <Input
                    label={'Password retype'}
                    value={this.state.passwordRetype}
                    onChangeText={(passwordRetype) => this.setState({ passwordRetype: passwordRetype.trim() })}
                    placeholder={'password retype'}
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                    autoCapitalize={'none'}

                />

                <Button
                    title={'REGISTER'}
                    style={styles.input}
                    onPress={this.onRegister}

                />

                <Text>Already have an account?</Text>

                <Button
                    type="outline"
                    title="LOGIN"
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
    }
});
