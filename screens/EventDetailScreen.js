import React from 'react';
import { Avatar } from 'react-native-elements';
import CTFEventDetail from '../components/CTFEvent/CTFEventDetail';

export default class EventDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // const { navigation } = this.props;
        // console.log("EventDetailScreen", navigation.getParam("event"));
    }
    render() {
        const { navigation } = this.props;
        return (<CTFEventDetail event={navigation.getParam("event")} navigation={navigation} />)
    }
}
EventDetailScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: navigation.getParam("title"),
    }
}