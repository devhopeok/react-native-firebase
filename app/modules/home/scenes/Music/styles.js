import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
      },
      pageHeader: {
        fontFamily: fontFamily.light,
        fontSize: 14,
        marginBottom: 13,
        marginLeft: 13,
        color: '#666'
    },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center',
      },
      button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'center',
      },
      buttonText: {
        fontSize: 18,
        color: 'blue',
      },
      buttonTextSmall: {
        fontSize: 15,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      player: {
        alignSelf: 'stretch',
        marginVertical: 0,
      },
      videoMetaContainer: {
        backgroundColor: '#fff'
      },
      videoMetaTitle: {
        fontFamily: fontFamily.light,
        fontSize: 14,
        marginBottom: 13,
        marginLeft: 13,
        marginTop: 13,
        color: '#666'
      },
      profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      },
      masterCenteringContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      centeringContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 26,
        backgroundColor: '#eee',
        borderRadius: 3,
        padding: 13,
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
      indiRankingName: {
        fontSize: 20
      }
});

export default styles;