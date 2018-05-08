import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    topContainer: {
        alignItems: 'center',
    },
    image:{
        height: 125,
        width: 89,
        backgroundColor: 'transparent',
        marginBottom: 0,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.bold,
        color:color.white,
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    containerView:{
        width: windowWidth - 40
    },

    socialButton:{
        height: normalize(50),
        borderRadius:3,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#000",
        height: normalize(50),
    },

    buttonText:{
        fontSize: fontSize.regular + 4,
        fontFamily: fontFamily.light,
        color: '#FFF'
    },

    buttonTextYouTube:{
        fontSize: fontSize.regular + 4,
        fontFamily: fontFamily.light,
        color: '#FFF'
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.light,
        marginRight: 5,
        color: "#000"
    },

    signInText:{
        fontSize: fontSize.regular,
        color: "#000",
        fontFamily: fontFamily.medium
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#C4C4C4',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: '#fff',
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: "#000",
        paddingHorizontal: padding
    }
});

export default styles;