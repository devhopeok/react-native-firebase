import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        backgroundColor: '#FFF',
    },

    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: '#FF0000',
        width: (windowWidth - 45),
        marginTop: 20,
    },

    containerView:{
        marginVertical: padding * 3,
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
        height: normalize(50)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.light
    },

    forgotText:{
        textAlign:"center",
        color: '#000',
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});


export default styles;