import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function UserScreen(props) {
  return (
    <ScrollView style={styles.container}>
        <Text>This is User Screen</Text>
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
