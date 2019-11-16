import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { withNavigation } from 'react-navigation';
import API_HELPERS from '../../api';
import { Text } from 'react-native-elements';
import { AuthContext } from '../../contexts/auth.context';
import DialogInput from 'react-native-dialog-input';


class Rankings extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Rank', 'Team', 'Score'],
            tableData: [],
            eventId: '',
            rank: [],
            dialogVisible: false,
            teamIdToAdd: ''
        }
    }
    fetchRankingAndRender = async(eventId) => {
        const { user } = this.context;
        try {
            const response = await API_HELPERS.GetRankingOfEvent(eventId);
            const { data } = response;
            if (data) this.setState({ rank: data });
            const template = [];

            if (user && user.role == 'admin') {
                data.forEach((obj, index) => {
                    const { score, team, teamId } = obj;
                    const t = [index + 1, team, score, teamId];
                    template.push(t);
                });

                this.setState({
                    tableHead: ['Rank', 'Team', 'Score', 'Edit Score'],
                })
            }
            else {
                data.forEach((obj, index) => {
                    const { score, team, teamId } = obj;
                    const t = [index + 1, team, score];
                    template.push(t);
                });

            }
            if (template.length > 0) {
                this.setState({
                    tableData: template
                })
            }

        } catch (err) {
            Alert.alert('Error', err.message);
        }

    }

    async componentDidMount() {
        const eventId = this.props.navigation.getParam('event');
        this.setState({
            eventId: eventId
        })

        this.fetchRankingAndRender(eventId);
    }

    _alertIndex(index, eventId) {
        Alert.alert(`This is row ${index + 1}`);
    }

    handleUpdateGrade = async (score) => {
        try {
            this.setState({ dialogVisible: false });
            const { user } = this.context;
            const { teamIdToAdd, eventId } = this.state
            console.log(typeof score);
            if (score == "") {
                throw new Error('Please insert grade number');
            }
            score = Number(score);
            if (typeof score != 'number') {
                throw new Error('Please insert grade number');

            }
            const res = await API_HELPERS.updateScore(user.token, teamIdToAdd, eventId, score);
            if (res) {
                Alert.alert('Successfully update');
                this.fetchRankingAndRender(eventId);
            } else {
                Alert.alert('Error', 'Failed to update, contact support');
            }
        } catch (err) {
            Alert.alert('Error ', err.message);
        }
    }

    showDialog = (teamId) => {
        this.setState({
            teamIdToAdd: teamId,
            dialogVisible: true
        });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };


    render() {

        const state = this.state;
        const element = (teamId, index) => (
            <TouchableOpacity key={index} onPress={() => this.showDialog(teamId)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Edit score</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                {this.state.tableData.length > 0
                    ?
                    (<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                        {
                            // <Rows data={state.tableData} textStyle={styles.text} /> 
                        }
                    </Table>)
                    : (<View style={{ flex: 1, paddingTop: 20 }}>
                        <ActivityIndicator />
                    </View>)}
                <DialogInput isDialogVisible={this.state.dialogVisible}
                    title={"Update grade: "}
                    message={"Please insert grade for this event:"}
                    hintInput={"0"}
                    submitInput={(inputText) => { this.handleUpdateGrade(inputText) }}
                    closeDialog={() => { this.handleCancel() }}>
                </DialogInput>
            </View>
        )
    }
}
export default withNavigation(Rankings);
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff', justifyContent: 'center', alignItems: 'center' },
    text: { margin: 6, fontSize: 16, height: 40, justifyContent: 'center', alignItems: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 'auto', height: 'auto', backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});