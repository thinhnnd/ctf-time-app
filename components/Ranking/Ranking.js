import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { withNavigation } from 'react-navigation';
import API_HELPERS from '../../api';
import { Text } from 'react-native-elements';
class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Rank', 'Team', 'Score'],
            tableData: [],
            eventId: '',
            rank: []
        }
    }
    async componentDidMount() {
        const eventId = this.props.navigation.getParam('event');
        const response = await API_HELPERS.GetRankingOfEvent(eventId);
        const { data } = response;
        if (data) this.setState({ rank: data });
        const template = [];
        data.forEach((obj, index) => {
            const { score, team, teamId } = obj;
            const t = [index + 1, team, score];
            template.push(t);
        });
        if (template.length > 0) {
            this.setState({ tableData: template })
        }
    }
    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                {this.state.tableData.length > 0
                    ?
                    (<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>)
                    : (<View style={{ flex: 1, paddingTop: 20 }}>
                        <ActivityIndicator />
                    </View>)}
            </View>
        )
    }
}
export default withNavigation(Rankings);
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff', justifyContent: 'center', alignItems: 'center' },
    text: { margin: 6, fontSize: 16, height: 40, justifyContent: 'center', alignItems: 'center' }
});