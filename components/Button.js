import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightBackground, extraLightBackground, darkBackground, darkText, lightText, emerald } from '../constants/Colors';
const { width, height } = Dimensions.get('window');


export default class Button extends React.Component {
    render() {
        let content;
        if (this.props.type === 'IconText') {
            content = (

                <TouchableOpacity activeOpacity={0.8} underlayColor={'transparent'} onPress={() => console.log("pressed icon+text")}>
                    <View style={{ justifyContent: 'center', alignItems: 'stretch' }}>
                        <Icon.Button style={{ alignSelf: 'center', margin: 0 }} name={this.props.icon} size={30} color={darkBackground} backgroundColor="transparent" onPress={this.props.onPress} />
                        <Text style={styles.buttonText}> {this.props.title} </Text>
                    </View>
                </TouchableOpacity>
            );

        } else if (this.props.type === 'Icon') {
            content = (
                <Icon.Button
                    style={{ alignSelf: 'center', margin: 0 }}
                    name={this.props.icon}
                    size={30}
                    color={darkBackground}
                    backgroundColor={'transparent'}
                    suppressHighlighting={true}
                    activeOpacity={0.9}
                    underlayColor={'transparent'}
                    onPress={this.props.onPress} />
            );

        } else {
            content = (<Text style={styles.buttonText}> {this.props.title} </Text>);
        }

        return (content)
    }
}

const styles = StyleSheet.create({

    backButton: {
        height: 44,
        width: 60,
        resizeMode: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "800",
        textAlign: 'left',
        color: darkText,
    },
    buttonGroup: {
        flexDirection: 'row',
        width: width - 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: extraLightBackground,

    },
    optionsButtonText: {
        fontSize: 18,
        fontWeight: "200",
        textAlign: 'center',
        color: darkText,
        width: width / 2 - 50,
        backgroundColor: 'blue',
        paddingVertical: 5,
    },
    basketButtonText: {
        fontSize: 18,
        fontWeight: "200",
        textAlign: 'center',
        color: 'white',
        paddingVertical: 5,
    }

});