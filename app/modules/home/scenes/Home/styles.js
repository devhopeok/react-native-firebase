import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    pageHeader: {
        fontFamily: fontFamily.light,
        fontSize: 14,
        marginBottom: 13,
        marginLeft: 13,
        color: '#666'
    },
    pageHeaderCommunity: {
      fontFamily: fontFamily.light,
      fontSize: 14,
      paddingLeft: 13,
      paddingVertical: 13,
      color: '#666',
      backgroundColor: 'white'
    },
    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    scrollBackground: {
        backgroundColor: '#eee',
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    homeContainer: {
        flex: 1,
        backgroundColor: '#eee',
      },
      recentUploadContainer: {
        height: 276,
        backgroundColor: '#fff',
        padding: 13,
        paddingBottom: 8,
        marginBottom: 13,
      },
      recentThumbContainer: {
        height: 196,
        backgroundColor: '#eee',
      },
      mediaUploadContainer: {
        height: 155,
        backgroundColor: '#fff',
        padding: 13,
        paddingBottom: 8,
        marginBottom: 13,
      },
      mediaThumbContainer: {
        height: 75,
        backgroundColor: '#eee',
      },
      thumbnail: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,  
      },
      recentCenteringContainer: {
          flexDirection: 'row',
      },
      recentVidProfile: {
          marginTop: 8,
          width: 50,
          height: 50,
          borderRadius: 50,
          overflow: 'hidden'
      },
      uncvrdProfilePic: {
        width: 50,
        height: 50,
      },
      topUserProfile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    userProfPic: {
      width: 50,
      height: 50,
    },
      recentVidMeta: {
          flex: 1,
          marginTop: 8,
          justifyContent: 'center',
      },
      recentVidTitle: {
          marginBottom: 4,
          color: 'black',
          paddingLeft: 13,
          fontSize: 13,
          fontFamily: fontFamily.regular,
      },
      recentViewersContainer: {
          paddingLeft: 13,
          flexDirection: 'row',
      },
      recentViewersProfile: {
          width: 16,
          height: 16,
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#fff',
      },
      recentViewersImage: {
        width: 16,
        height: 16,
      },
      recentViewersProfile2: {
          marginLeft: -6,
      },
      recentViewersText: {
          color: '#aaa',
          fontFamily: fontFamily.light,
          fontSize: 12,
          marginLeft: 4,
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      videoFeedContainer: {
        backgroundColor: 'white',
        flex: 1,
        // paddingLeft: 13,
        // paddingTop: 13,
        // paddingBottom: 0,
        // paddingRight: 13,
      },
      mediaContainer: {
        flex: 1,
        height: 84,
        backgroundColor: 'white',
        marginBottom: 13,
        flexDirection: 'row',
      }, 
      mediaThumbnail: {
        height: 84,
        width: 149,
        marginRight: 8,
      },
      mediaMetaContainer: {
        height: 84,
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
      },
      mediaTitle: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: 'black',
      },
      sharedByUser: {
          fontSize: 10,
          color: '#aaa',
          marginTop: 2,
      },
      bottomMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      bottomRightContainer: {
          flexDirection: 'row',
          justifyContent: 'center'
      },
      metaLikeCounter: {
        fontFamily: fontFamily.regular,
        color: '#aaa',
        fontSize: 10,
        marginLeft: 3,
      },
      indiMediaContainer: {
          flex: 1
      },
      indiMediaThumbnail: {
          alignSelf: 'stretch',
          height: PixelRatio.roundToNearestPixel(Dimensions.get("window").width / (16 / 9))
      },
      linGradMedia: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        height: PixelRatio.roundToNearestPixel(Dimensions.get("window").width / (16 / 9))
      },
      mediaTextContainer: {
        alignItems: 'center',
        flex: 1, 
        justifyContent: 'flex-end',
        paddingBottom: 13,
      },
      mediaTextTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
        color: 'white'
      },
      mediaTextBy: {
          fontFamily: fontFamily.light,
          fontSize: 14,
          color: '#ccc',
          marginVertical: 2,
      },
      mediaTextSubmittedBy: {
        fontFamily: fontFamily.light,
        fontSize: 14,
        color: 'white',
      },
      topUserListContainer: {
          //alignItems: "center",
          paddingLeft: 7,
          marginBottom: 13
      },
      indiTopProfContainer: {
          width: 120,
          height: 120,
          padding: 13,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          marginHorizontal: 6,
          justifyContent: "space-around",
          alignItems: 'center',
      },
      indiTopUserBottomContainer: {
        alignItems: 'center',
      },
      topUsernameFont: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        marginBottom: 14
      },
      topMinutesFont: {
        fontSize: 10,
        fontFamily: fontFamily.light,
        color: '#666'
      }
});

export default styles;