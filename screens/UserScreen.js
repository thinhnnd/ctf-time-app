import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import {
    Header,
    ListItem,
    Divider 
} from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import Register from '../components/User/Register';

const mocks = [
    {
        title: 'Change Password',
        icon: 'key'
    },
    {
        title: 'Setting',
        icon: 'cog'
    }, 
    {
        title: 'Privacy & Policy',
        icon: 'file'
    }, 
    {
        'title': 'Contact',
        icon: 'envelope'
    }
]

export default function UserScreen(props) {
    const [isLogin, setIsLogin] = useState(true);

    let userCredentials;
    if(isLogin) {
        userCredentials = <Button
            title="LOGIN/REGISTER"
            onPress={() => props.navigation.navigate('Login')}
        />
    }
    else {
        userCredentials = <ListItem
            leftAvatar={{
                title: 'User',
                source: { uri: '' },
                showEditButton: true,
            }}
            onPress={() => props.navigation.navigate('ModifyUserInfo')}
            title={'name'}
            subtitle={'false'}
            bottomDivider
            chevron
        />
    }


    return (
        <ScrollView style={styles.container}>
            {
                userCredentials
            }

            <Divider style={{ backgroundColor: 'blue' }} />

            {
                mocks.map( (mock, i) => (<ListItem
                    key={i}
                    title={mock.title}
                    leftIcon={{ 
                        type: 'font-awesome',
                        name: mock.icon }}
                    bottomDivider
                    chevron
                  />))
            }
        </ScrollView>
    );
}

UserScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
