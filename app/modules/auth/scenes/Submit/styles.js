import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    submitTextHeader: {
        fontFamily: fontFamily.bold,
        fontSize: 20
    },
    submitTextHeaderHub: {
        marginBottom: 10
    },
    submitText: {
        fontFamily: fontFamily.light,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: '#000',
        margin: 0,
        width: Dimensions.get('window').width - 26,
    },
    buttonText: {
        fontFamily: fontFamily.light,
    },
    masterCenteringContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centeringContainer: {
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 26,
        backgroundColor: '#eee',
        borderRadius: 3,
        padding: 13,
        marginVertical: 13,
    },
    minutesWatched: {
        fontFamily: fontFamily.light,
        fontSize: 26,
        color: '#666',
        flexDirection: 'row',
    },
    minutesText: {
        fontFamily: fontFamily.light,
        fontSize: 13,
        color: '#666',
        flexDirection: 'row',
    },
});

export default styles;