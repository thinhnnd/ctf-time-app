import { StyleSheet, Dimensions } from "react-native";
import { lightBackground, extraLightBackground, darkText, lightText } from '../../constants/Colors';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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

