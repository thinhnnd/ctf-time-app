import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Register from '../components/User/Register';

export default function RegisterScreen(props) {
  return (
    <ScrollView style={styles.container}>
        <Register />
    </ScrollView>
  );
}

UserScreen.navigationOptions = {
  title: 'Register',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
