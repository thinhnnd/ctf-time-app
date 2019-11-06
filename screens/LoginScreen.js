import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Login from '../components/User/Login';

export default function LoginScreen() {
  return (
    <ScrollView style={styles.container}>
      <Login />
    </ScrollView>
  );
}

TeamScreen.navigationOptions = {
  title: 'Team',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    color: '#ffffff'
  },
});