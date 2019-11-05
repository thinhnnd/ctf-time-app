import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { 
    Alert, 
    TextInput, 
    View, 
    StyleSheet, 
    Image,
    KeyboardAvoidingView 
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

 
export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  async onLogin() {
    const { email, password } = this.state;

    const config = {
        method: 'POST',
        url: 'http://192.168.0.103:5000/auth/login',
        header: {'User-Agent': 'UIT CTF time Android app'},
        data: {
            email: "admin@gmail.com",
	        password: "admin123"
        }
    }
    try {
        let res = await axios.request(config);
        console.log(res.data);
        let result = await AsyncStorage.setItem('@MySuperStore:user_info', JSON.stringify(res.data))
        console.log('result', result);

        const value = await AsyncStorage.getItem('@MySuperStore:user_info');
        if(!value) {
            console.log(value);
        }
    } catch (err) {
        console.log(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/logo/logo.png')} />
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
            type="outline"
            title="Login"
            titleStyle={styles.button}
            onPress={this.onLogin.bind(this)}
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
  },
  button: {
      textTransform: 'uppercase'
  }
});
