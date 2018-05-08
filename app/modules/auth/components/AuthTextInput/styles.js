import { 
    StyleSheet,
    Platform
} from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 12,
        
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(50),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.light,
        backgroundColor: '#eee',
        borderRadius: 3,
        paddingLeft: 16,
        ...Platform.select({
            ios: {
              borderBottomColor: 'white',
              borderBottomWidth: 0,
              marginLeft: 20,
              marginRight: 20,
            },
          }),
    }
});

export default styles;