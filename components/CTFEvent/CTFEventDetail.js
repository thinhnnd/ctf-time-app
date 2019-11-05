import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ScrollView,
    Animated,
    Text,
    Linking
} from 'react-native';
import { lightBackground, extraLightBackground, darkText, lightText, emerald } from '../../constants/Colors';
import Button from '../../components/Button';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

const { width } = Dimensions.get('window');
const kPosterImageHeight = 480;

export default class CTFEventDetail extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        this._scrollY = new Animated.Value(0)
        this.animatedOpacity = this._scrollY.interpolate({
            inputRange: [40, 100],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }
    render() {
        const { event } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', left: 10, top: 20, zIndex: 2, width: width }}>
                    <Animated.View style={
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            opacity: this.animatedOpacity,
                        }
                    }>
                        {/* <Button
                            type='Icon'
                            icon={'md-arrow-round-back'}
                            onPress={() => this.props.navigation.goBack()} />

                        <Button
                            type='Icon'
                            icon={'ios-share'}
                            onPress={() => this.props.navigation.goBack()} /> */}
                    </Animated.View>
                </View>
                <ScrollView
                    contentContainerStyle={{ width: width }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this._scrollY } } }]
                    )}
                >
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{}}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={width}
                        snapToAlignment={"center"}
                        snapToStart={true}
                        decelerationRate="fast">
                        <Image style={{ height: kPosterImageHeight, width: width, marginTop: 0 }} source={{ uri: event.logo, crop: { left: 10, top: 50, width: 20, height: 40 } }} />
                    </ScrollView>
                    {this.actionButtonGroup()}
                    <View style={styles.eventDescription}>
                        <Text style={styles.title}> {event.title} </Text>
                        <Text style={styles.subTitle}> {event.description} </Text>
                    </View>

                    <View style={styles.optionsGroup}>
                        <Text style={styles.optionsButtonText}>Start at {new Date(event.start).toGMTString()}  </Text>
                        <View style={{ backgroundColor: extraLightBackground, height: 30, width: 1 }}></View>
                        <Text style={styles.optionsButtonText}>Finish at {new Date(event.finish).toGMTString()} </Text>
                    </View>

                    <LineIcon.Button
                        style={{ marginHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}
                        name="bag"
                        size={24}
                        borderRadius={0}
                        color='white'
                        backgroundColor={emerald}
                        onPress={this.onJoinButtonPressed}>
                        <Text style={styles.joinButtonText}> JOIN NOW </Text>
                    </LineIcon.Button>

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
                </ScrollView>
            </View>
        );
    }
    onJoinButtonPressed(event) {
        console.log('JOIN event');
    }
    onBackButtonPressed() {
        console.log("pop back")
    }
    onLikeButtonPressed() {
        console.log('LIKED event');

    }
    onShareButtonPressed() {
        console.log('SHARE event');

    }

    actionButtonGroup() {
        return (
            <View style={styles.buttonGroup}>
                {<Button type={'IconText'} icon={'ios-heart-empty'} title={'LIKE'} onPress={this.onLikeButtonPressed} />}
                {<Button type={'IconText'} icon={'ios-play'} title={'JOIN'} onPress={this.onJoinButtonPressed} />}
                {<Button type={'IconText'} icon={'md-share'} title={'SHARE'} onPress={this.onShareButtonPressed} />}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBackground,
        paddingTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
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
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        marginBottom: 0,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: extraLightBackground,

    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: 'left',
        paddingVertical: 10,
        color: darkText,
    },
    subTitle: {
        fontSize: 14,
        textAlign: 'left',
        color: lightText,
    },
    eventDescription: {
        alignSelf: 'stretch',
        margin: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: extraLightBackground,
    },
    optionsGroup: {
        height: 54,
        margin: 20,
        marginTop: -20,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: extraLightBackground,
    },
    optionsButtonText: {
        fontSize: 14,
        fontWeight: "200",
        textAlign: 'center',
        color: darkText,
        width: width / 2 - 50,
        backgroundColor: 'white',
        paddingVertical: 5,
    },
    joinButtonText: {
        fontSize: 14,
        fontWeight: "800",
        textAlign: 'center',
        color: 'white',
    },
    eventInfo: {
        alignSelf: 'stretch',
        margin: 20,
        paddingBottom: 20,
        borderColor: extraLightBackground,
    },
    list: {
        fontSize: 16,
        textAlign: 'left',
        color: darkText,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: extraLightBackground,
    }
});

