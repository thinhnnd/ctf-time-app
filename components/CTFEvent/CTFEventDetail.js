import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    ScrollView,
    Animated,
    Text,
    Linking,
    Alert
} from 'react-native';
import { lightBackground, extraLightBackground, darkText, lightText, emerald } from '../../constants/Colors';
import Button from '../../components/Button';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import * as SecureStore from 'expo-secure-store';
import { styles } from './styles';
import DATABASE_HELPERS from '../../database_helpers';
import StaticDetails from './StaticDetails';

const { width } = Dimensions.get('window');
const kPosterImageHeight = 480;
const Duration = ({ event }) => (
    <View style={styles.optionsGroup}>
        <Text style={styles.optionsButtonText}>Start at {new Date(event.start).toGMTString()}  </Text>
        <View style={{ backgroundColor: extraLightBackground, height: 30, width: 1 }}></View>
        <Text style={styles.optionsButtonText}>Finish at {new Date(event.finish).toGMTString()} </Text>
    </View>
)

export default class CTFEventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isJoined: false,
            isWarning: false,
            warningText: ''
        }
    }
    componentDidMount() {

    }
    componentWillMount() {
        this._scrollY = new Animated.Value(0)
        this.animatedOpacity = this._scrollY.interpolate({
            inputRange: [40, 100],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
    }
    onJoinButtonPressed = async (event) => {
        // const tokenPromise = DATABASE_HELPERS.getUserToken();
        const userPromise = DATABASE_HELPERS.getUserInfo();
        // const token = await tokenPromise;
        const userString = await userPromise;
        const user = JSON.parse(userString);
        const token = user && user.token;
        if (token) {
            console.log('JOIN event');
            console.log(user._id);
            if (user.teams.length > 0) {
                //reg event
                const body = {
                    eventId: event._id,
                    teamId: user.teams[0]
                }
                this.setState({ isJoined: true });
            }
            else {
                this.setState({ isWarning: true, warningText: 'You are not a member of any teams, create now?', isJoined: false });
                Alert.alert('Can\'t join event', this.state.warningText, [
                    { text: 'Later', onPress: () => console.log('Later') },
                    { text: 'OK', onPress: () => console.log('OK, create a team') }
                ], { cancelable: false });
            }
        }
        else {
            this.setState({ isWarning: true, warningText: 'Join event failed', isJoined: false });
            Alert.alert('Please login to join event', this.state.warningText, [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('Login', { from: 'EventDetail' });
                    }
                }
            ], { cancelable: false });
        }
    }
    render() {
        const { event } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', left: 10, top: 20, zIndex: 2, width: width }}>
                    <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', opacity: this.animatedOpacity, }} />
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
                    <Duration event={event} />
                    <LineIcon.Button
                        style={{ marginHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}
                        name={this.state.isJoined ? "check" : "plus"}
                        size={24}
                        borderRadius={0}
                        color='white'
                        backgroundColor={emerald}
                        onPress={this.onJoinButtonPressed}>
                        <Text style={styles.joinButtonText}> {this.state.isJoined ? "JOINED" : "JOIN NOW "}</Text>
                    </LineIcon.Button>
                    <StaticDetails event={event} styles={styles} />
                    <Text onPress={() => {
                        DATABASE_HELPERS.clearUserInfo();
                        DATABASE_HELPERS.clearUserToken();
                        this.setState({ isJoined: false });
                    }}>Logout</Text>
                </ScrollView>

            </View>
        );
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
