import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    SafeAreaView,
} from 'react-native';
// import Login from '../components/User/Login';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
import { Button as ButtonRNE } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;




export default function ManagementButton(props) {
    // const { user } = useContext(AuthContext);
    const { team } = props;
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                    title="Add User"
                    buttonStyle={{
                        height: 33,
                        width: 120,
                        backgroundColor: 'rgba(113, 154, 112, 1)',
                        borderRadius: 5,
                    }}
                    titleStyle={{
                        fontWeight: 'normal',
                        fontSize: 13,
                        color: 'white'
                    }}

                    onPress={ () => props.navigate('TeamManagement', { team: team})}
                />
            </View>
        </View>
    )
}