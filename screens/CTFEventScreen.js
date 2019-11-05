import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import API_HELPERS from '../api';
import ListCTFEvent from '../components/CTFEvent/ListCTFEvent';
export default class CTFEventScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: true
        };
    }
    componentDidMount() {
        API_HELPERS.getAllEvents()
            .then(events => {
                this.setState({ events: events, isLoading: false });
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.state.isLoading) {
            return (<View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
            </View>)
        }
        return (
            <ListCTFEvent events={this.state.events} navigate={this.props.navigation.navigate} />
        )
    }
}
CTFEventScreen.navigationOptions = {
    title: 'Events',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
