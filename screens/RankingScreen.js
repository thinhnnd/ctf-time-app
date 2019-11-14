import React from 'react';
import { withNavigation } from 'react-navigation';
import Rankings from '../components/Ranking/Ranking';

function RankingScreen(props) {
    return <Rankings />
}

RankingScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: navigation.getParam("eventName"),
        headerLeft: null
    }
}

export default withNavigation(RankingScreen)