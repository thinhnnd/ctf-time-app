import React from 'react';
import { lightBackground, extraLightBackground, darkText } from '../../constants/Colors';
import { View, Text } from 'react-native';
export default function StaticDetails({ event, styles }) {
    return (
        <View>
            <View style={styles.eventInfo}>
                <View style={{ backgroundColor: lightBackground, alignSelf: 'stretch', borderBottomWidth: 1, borderColor: extraLightBackground, }}>
                    <Text
                        style={styles.list}
                        onPress={() => Linking.openURL(event.url)}>
                        Official URL : {event.url}
                    </Text>
                </View>
                <View style={{ backgroundColor: lightBackground, alignSelf: 'stretch', borderBottomWidth: 1, borderColor: extraLightBackground, }}>
                    <Text
                        style={styles.list}
                        onPress={() => Linking.openURL(event.ctftime_url)}>
                        CTFTime URL : {event.ctftime_url}
                    </Text>
                </View>
                <View style={{ backgroundColor: lightBackground, alignSelf: 'stretch', borderBottomWidth: 1, borderColor: extraLightBackground, }}>
                    <Text style={styles.list}> Format : {event.format} </Text>
                </View>
                <View style={{ backgroundColor: lightBackground, alignSelf: 'stretch', borderBottomWidth: 1, borderColor: extraLightBackground, }}>
                    <Text style={styles.list}> Weight : {event.weight} </Text>
                </View>
                <Text style={styles.list}>
                    Duration : {event.duration.days
                        ? `${event.duration.days} days ${event.duration.hours} hours`
                        : `${event.duration.hours} hours`}
                </Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 20, backgroundColor: 'rgb(250,248,250)' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                    <Text style={{ fontSize: 18, color: darkText }}>{'participants'.toUpperCase()}</Text>
                    <Text style={{ fontSize: 14, color: darkText }}>{event.participants + ' teams'}</Text>
                </View>
            </View>
        </View>
    )
}