import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Register from '../components/User/Register';

export default function UserScreen(props) {
  return (
    <ScrollView style={styles.container}>
        <Register />
    </ScrollView>
  );
}

UserScreen.navigationOptions = {
  title: 'User',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
