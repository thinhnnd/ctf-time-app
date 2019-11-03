import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default function TeamScreen() {
  return (
    <ScrollView style={styles.container}>
        <Text>This is Team Screen</Text>
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
    backgroundColor: '#fff',
  },
});
