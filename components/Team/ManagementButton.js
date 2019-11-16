import React from 'react';
import {
    View,
    Button,
} from 'react-native';



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
                    title="Add Member"
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

                    onPress={ () => props.navigate('TeamManagement', { team: team, fetchTeam: props.fetchTeam})}
                />
            </View>
        </View>
    )
}