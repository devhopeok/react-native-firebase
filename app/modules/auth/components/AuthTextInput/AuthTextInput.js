import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles";
import { theme } from "../../index";
const { windowWidth, fontSize, fontFamily, normalize } = theme;

class AuthTextInput extends Component {
    render() {
        const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry } = this.props;

        return (
            <View style={styles.container}>
                {
                    (showLabel) &&
                    <FormLabel labelStyle={{
                        color: '#aaa',
                        fontFamily: fontFamily.light,
                        margin: 0,
                        marginBottom: 8,
                        marginTop: 0,
                        paddingLeft: 20,
                    }}>{this.props.label}</FormLabel>
                }
                <FormInput
                    containerStyle={{borderBottomWidth: 0}}
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    //underlineColorAndroid={"#fff"}
                    placeholder={placeholder}
                    placeholderTextColor="#86939e"
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    inputStyle={styles.inputContainer}
                    value={this.props.value}/>
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage>
                        {this.props.error}
                    </FormValidationMessage>
                }
            </View>
        );
    }
}

AuthTextInput.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
}

AuthTextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false
}

export default AuthTextInput;