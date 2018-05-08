import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    personalLeaderboard: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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