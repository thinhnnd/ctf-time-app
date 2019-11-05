import React from 'react';
import { ActivityIndicator, StyleSheet, Platform, View, FlatList, Text, Alert } from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ListViewItemSeparator = () => {
    return (
        <View
            style={{
                height: .5,
                width: "100%",
                backgroundColor: "#e5e5e5",
            }}
        />
    );
};
const handlerCTFEventDetail = (event, navigate) => {
    // console.log('event handler', event);

    navigate('EventDetail', { event: event, title: event.title });
}
const CTFEvent = ({ event, navigate }) => {
    if (!event.logo) event.logo = 'https://embeddedworldhome.files.wordpress.com/2019/05/icons_ctf_1.png?w=1250';
    const subtitle = `
⇒ Format: ${event.format}
⇒ Weight: ${event.weight}
⇒ Start: ${new Date(event.start).toGMTString()}
⇒ End: ${new Date(event.finish).toGMTString()}
`
    return (
        <ListItem
            onPress={() => handlerCTFEventDetail(event, navigate)}
            title={event.title}
            leftAvatar={{
                source: event.logo && { uri: event.logo }
            }}
            subtitle={subtitle}
            chevron
            bottomDivider
        >
        </ListItem>
    )
}

export default class ListCTFEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            events: []
        }
    }
    componentDidMount() {
        const { events } = this.props;
        console.log(this.props.events.length);
        this.setState({ isLoading: false, events: events });
    };

    render() {
        if (this.state.isLoading) {
            return (<View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
            </View>)
        }
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.events}
                    renderItem={({ item }) => (
                        <CTFEvent
                            event={item}
                            navigate={this.props.navigate}
                        />
                    )}
                    keyExtractor={event => event._id}
                    ItemSeparatorComponent={ListViewItemSeparator}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    imageViewContainer: {
        width: '50%',
        height: 100,
        margin: 10,
        borderRadius: 10

    },
    textViewContainer: {
        textAlignVertical: 'center',
        width: '50%',
        padding: 20
    }
})