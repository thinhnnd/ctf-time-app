import React from 'react';

import { View, Alert } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { AuthContext } from '../../contexts/auth.context';
import API_HELPERS from '../../api';
import DialogInput from 'react-native-dialog-input';
import { Icon } from 'react-native-elements';

class EventItemMenu extends React.PureComponent {
    _menu = null;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            gradeDialogOpen: false,
            dialogVisible: false
        }
    }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    handleCancelEvent = async () => {
        try {
            this.hideMenu();
            console.log(' Cancel Event ');
            const { user } = this.context;
            const { team, event } = this.props;
            let res = await API_HELPERS.deleteRegistrationEvent(user.token, team._id, event.event);
            if (!res.data) {
                Alert.alert('Error, can not cancel');

            }
            Alert.alert('Cancel Successfully');


        } catch (err) {
            Alert.alert(err.message);
        }

    }

    handleUpdateGrade = async (score) => {
        try {
            this.setState({ dialogVisible: false });
            this.hideMenu();
            const { user } = this.context;
            const { team, event } = this.props;
            console.log(typeof score);
            if(score == "") {
                throw new Error('Please insert grade number');
            }
            score = Number(score);
            if(typeof score != 'number') {
                throw new Error('Please insert grade number');
  
            } 
            const res = await API_HELPERS.updateScore(user.token, team._id, event.event, score);
            if(res) {
                Alert.alert('Successfully update');
            } else {
                Alert.alert('Error', 'Failed to update, contact support');
            }
            console.log(' Update grade ');
        } catch (err) {
            Alert.alert('Error ',err.message);
        }
    }

    showDialog = () => {
        this.hideMenu();
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {

        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };



    render() {
        const { user } = this.context;
        const { team, userInfo } = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <Icon onPress={this.showMenu} name="more-vert" type="material" /> }
                >
                    {user._id == team.leader ? <MenuItem onPress={this.handleCancelEvent}>Cancel Event</MenuItem> : null}
                    {user.role == "admin" ? <MenuItem onPress={this.showDialog}>Update Score</MenuItem> : null}

                    <MenuDivider />
                </Menu>

                <DialogInput isDialogVisible={this.state.dialogVisible}
                    title={"Update grade: "}
                    message={"Please insert grade for this event:"}
                    hintInput={"0"}
                    submitInput={(inputText) => { this.handleUpdateGrade(inputText) }}
                    closeDialog={() => { this.handleCancel() }}>
                </DialogInput>
            </View>
        );
    }
}

export default EventItemMenu;

// <Dialog.Container visible={this.state.dialogVisible}>
// <Dialog.Title>Updade score</Dialog.Title>
// <Dialog.Description>
//     Please insert a new score:
// </Dialog.Description>
// <Dialog.Input wrapperStyle={{ borderBottom: '1px solid cyan' }} />
// <Dialog.Button label="Submit" onPress={this.handleSubmit} />
// </Dialog.Container>