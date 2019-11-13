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
import { Avatar } from 'react-native-elements';
import { lightBackground, extraLightBackground, darkText, lightText, emerald } from '../../constants/Colors';
import Button from '../../components/Button';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import * as SecureStore from 'expo-secure-store';
import { styles } from './styles';
import DATABASE_HELPERS from '../../database_helpers';
import StaticDetails from './StaticDetails';
import { AuthContext } from '../../contexts/auth.context';
import API_HELPERS from '../../api';

const { width } = Dimensions.get('window');
const kPosterImageHeight = 480;
const Duration = ({ event }) => (
    <View style={styles.optionsGroup}>
        <Text style={styles.optionsButtonText}>Start at {new Date(event.start).toGMTString()}  </Text>
        <View style={{ backgroundColor: extraLightBackground, height: 30, width: 1 }}></View>
        <Text style={styles.optionsButtonText}>Finish at {new Date(event.finish).toGMTString()} </Text>
    </View>
)
const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 40;

export default class CTFEventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isJoined: false,
            isWarning: false,
            warningText: '',
            liked: false,
            isFinished: false
        }
    }
    static contextType = AuthContext;
    componentWillMount() {
        this._scrollY = new Animated.Value(0)
        this.animatedOpacity = this._scrollY.interpolate({
            inputRange: [40, 100],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
    }
    componentDidMount() {
        const current = new Date().getTime();
        const eventFinished = new Date(this.props.event.finish).getTime();
        if (current > eventFinished) {
            this.setState({ isFinished: true });
        }
    }
    onJoinButtonPressed = async () => {
        const { event } = this.props;
        const { user } = this.context;
        const { isFinished } = this.state;
        const token = user && user.token;
        if (token) {
            console.log('JOIN event');
            console.log(user._id);
            if (user.teams.length > 0) {
                //reg event
                if (isFinished) {
                    Alert.alert('Event finished', `${event.title} has been finished`);
                    return;
                }
                const body = {
                    eventId: event._id,
                    teamId: user.teams[0]
                }
                try {
                    const response = await API_HELPERS.RegisterEvent(token, body);
                    const { data } = response;
                    if (data._id) {
                        Alert.alert('Successfully', 'You registered this event successfully');
                    }
                } catch (error) {
                    const { data } = error.response;
                    Alert.alert('Register event failed', data.message);
                }
                this.setState({ isJoined: true });
            }
            else {
                this.setState({ isWarning: true, warningText: 'You are not a member of any teams, create now?', isJoined: false },
                    () => {
                        Alert.alert('Can\'t join event', this.state.warningText, [
                            { text: 'Later', onPress: () => console.log('Later') },
                            { text: 'OK', onPress: () => console.log('OK, create a team') }
                        ], { cancelable: true });
                    });
            }
        }
        else {
            this.setState({ isWarning: true, warningText: 'Join event failed', isJoined: false }, () => {
                Alert.alert('Please login to join event', this.state.warningText, [
                    {
                        text: 'OK', onPress: () => {
                            this.props.navigation.navigate('Login', { from: 'EventDetail' });
                        }
                    }
                ], { cancelable: true });
            });
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
                    <View
                        containerStyle={{
                            flex: 3,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar
                            title={event.title[0]}
                            source={{ uri: event.logo }}
                            center
                            style={{
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
                                borderRadius: 10,
                                alignSelf: 'center'
                            }}
                        />
                    </View>
                    {this.actionButtonGroup()}
                    <View style={styles.eventDescription}>
                        <Text style={styles.title}> {event.title} </Text>
                        <Text style={styles.subTitle}> {event.description} </Text>
                    </View>
                    <Duration event={event} />
                    <LineIcon.Button
                        style={{ marginHorizontal: 0, alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
                        name={this.state.isFinished ? 'flag' : this.state.isJoined ? "check" : "plus"}
                        size={24}
                        borderRadius={0}
                        color='white'
                        backgroundColor={this.state.isJoined || this.state.isFinished ? '#ffbb33' : '#00cb51'}
                        onPress={this.onJoinButtonPressed}>
                        <Text style={styles.joinButtonText}> {this.state.isFinished ? 'FINISHED' : this.state.isJoined ? "JOINED" : "JOIN NOW "}</Text>
                    </LineIcon.Button>
                    <StaticDetails event={event} styles={styles} />
                </ScrollView>
            </View>
        );
    }

    onBackButtonPressed = () => {
        console.log("pop back")
    }
    onLikeButtonPressed = () => {
        this.setState({ liked: true });
    }
    onShareButtonPressed = () => {
        console.log('SHARE event');

    }
    actionButtonGroup = () => {
        const { liked, isFinished } = this.state;
        return (
            <View style={styles.buttonGroup}>
                {<Button type={'IconText'} icon={!liked ? 'ios-heart-empty' : 'ios-heart'} title={'LIKE'} onPress={this.onLikeButtonPressed} />}
                {<Button type={'IconText'} icon={'ios-play'} title={isFinished ? 'FINISHED' : 'JOIN'} onPress={this.onJoinButtonPressed} />}
                {<Button type={'IconText'} icon={'md-share'} title={'SHARE'} onPress={this.onShareButtonPressed} />}
            </View>
        );
    }
}
