import { Dimensions, Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
    black: "#3B3031",
    light_black: "#414141",
    main: "#232323",
    white: "#ffffff",
    light_grey: "#eaeaea",
    grey: "#ccc",
    red: "red",
    underlayColor: "#ddd"
}

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21)
}

const fontFamily = {
    bold: "SFBold",
    medium: "SFMedium",
    regular: "SFRegular",
    light: "SFLight"
}

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
const navTitleStyle = { fontSize: fontSize.regular , fontFamily: fontFamily.bold, color: color.black }

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    normalize
}