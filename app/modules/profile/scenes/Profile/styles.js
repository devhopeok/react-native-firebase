import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    profileTopContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    usernameText: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular + 4,
        marginBottom: 6,
    },
    userMinutes: {
        fontFamily: fontFamily.light,
        fontSize: fontSize.small,
        color: '#000',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 13,
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: '#000',
        margin: 0,
    },
    buttonText: {
        fontFamily: fontFamily.light,
    },
    leaderboardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 13,
    },
    leaderboardTitle: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: '#aaa',
    },
    leaderboardButton: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: '#aaa',
    },
    personalLeaderboard: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 3,
        marginBottom: 13,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'space-between',
    },
    leaderboardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    personalRanking: {
        marginRight: 12,
    },
    indiRankingName: {
        marginRight: 12,
    },
    minutesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indiTotalMinutes: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
    },
    indiTotalMinutesTitle: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small - 2,
        color: '#aaa',
    },
});

export default styles;