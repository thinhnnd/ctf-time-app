import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import Login from '../components/User/Login';

export default function TeamScreen(props) {

  return (
    <ScrollView style={styles.container}>
      <Text>Please login</Text>
      <Button 
      title="LOGIN/REGISTER"
      onPress={() => props.navigation.navigate('Login')}
      />
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
