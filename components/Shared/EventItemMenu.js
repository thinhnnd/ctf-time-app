import React from 'react';
 
import { View, Text, Alert } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { AuthContext } from '../../contexts/auth.context';
import API_HELPERS from '../../api'
 
class EventItemMenu extends React.PureComponent {
  _menu = null;

  static contextType = AuthContext;

  constructor(props) {
      super(props);
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
        let res = await API_HELPERS.deleteRegistrationEvent(user.token, team._id, event.event );
        if(!res.data) {
            Alert.alert('Error, can not cancel');

        }
        Alert.alert('Cancel Successfully');

          
      } catch ( err ) {
          Alert.alert(err.message);
      }
    
  }

  handleUpdateGrade = async () => {
      try {
        this.hideMenu();
        const { user } = this.context;
        const { team, event } = this.props;
        let score = Alert.prompt('Input ccore to change: ');
        await API_HELPERS.updateScore(user.token, team._id, event._id, score);
        console.log(' Update grade ');
      } catch ( err ) {
        Alert.alert(err.message);
      }
  }
 
  render() {
    const { user } = this.context;
    const { team, userInfo } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          { user._id == team.leader ? <MenuItem onPress={this.handleCancelEvent}>Cancel Event</MenuItem> : null }
          { user.role == "admin" ? <MenuItem onPress={this.handleUpdateGrade}>Update Score</MenuItem> : null }

          <MenuDivider />
        </Menu>
      </View>
    );
  }
}
 
export default EventItemMenu;