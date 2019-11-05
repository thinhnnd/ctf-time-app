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
 
export default class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordRetype: '',
      dateOfBirth: new Date(''),
    };
  }
  
  onRegister() {
    const { email, name, password, passwordRetype, dateOfBirth } = this.state;

    Alert.alert('Register ', `${email} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/uit-ctf-time.png')} />
        <Input
            label={'Email'}
            value={this.state.username}
            placeholder={'example@address.com'}
            onChangeText={(username) => this.setState({ username })}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputWrapper}

        />

        <Input
            label={'Full Name'}
            value={this.state.name}
            placeholder={'Tran Van B'}
            onChangeText={(name) => this.setState({ name })}
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


        <Input
            label={'Password retype'}
            value={this.state.passwordRetype}
            onChangeText={(passwordRetype) => this.setState({ passwordRetype })}
            placeholder={'password retype'}
            secureTextEntry={true}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputWrapper}
        />
        
        <Button
            type="outline"
            title={'Login 21'}
            style={styles.input}
            onPress={this.onRegister.bind(this)}
            
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
