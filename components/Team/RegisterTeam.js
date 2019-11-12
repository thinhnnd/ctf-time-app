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
} from 'react-native';
import {
    Input,
    Button,
} from 'react-native-elements';
import API_HELPERS from '../../api';

export default class RegisterTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
        };
    }

    handleRegister = async () => {
        const { teamName } = this.state;
        const { token } = this.context.user;
        const payload = { teamName };
        try {
            const response = await API_HELPERS.CreateNewTeam(token, payload);
            console.log(response.data);
            
        } catch (error) {
            const { data } = error.response;
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Image source={require('../../assets/images/uit-ctf-time.png')} />
                <Input
                    label={'Team Name'}
                    value={this.state.teamName}
                    placeholder={'Your Team Name'}
                    onChangeText={teamName => this.setState({ teamName })}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputWrapper}
                />
                <Button
                    title={'REGISTER'}
                    style={styles.input}
                    onPress={this.handleRegister}

                />
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
