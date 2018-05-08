import { StyleSheet } from 'react-native';
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
      },
      videoMetaContainer: {
      },
      videoMetaTitle: {
          color: 'black',
          fontFamily: fontFamily.regular,
          fontSize: 14,
          padding: 13,
      },
      userProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 13,
      },
      watchYTBtnContainer: {
          flex: 1,
          padding: 8
      },
      commentBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center' ,
        marginBottom: 13,
        paddingTop: 8,
        paddingLeft: 13,
        paddingRight: 13,
        paddingBottom: 8,
        justifyContent: 'space-between',
      },
      profileRight: {
        flexDirection: 'row',
        backgroundColor: '#FF0000',
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,

      },
      profileRightDislike: {
          backgroundColor: '#eee',
      },
      likedComponent: {
          flexDirection: 'row',
      },
      commentBtnText: {
        fontFamily: fontFamily.light,
        fontSize: 12,
        color: '#FF0000',
        marginBottom: 1,
        marginLeft: 4,
      },
      commentBtnTextLiked: {
        color: '#fff',
      },
      minutesWatched: {
        fontFamily: fontFamily.light,
        fontSize: 10,
        color: '#666',
      }
});

export default styles;