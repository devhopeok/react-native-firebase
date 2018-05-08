import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';

import {actions as auth} from "../../index"
const {} = auth;

import styles from "./styles"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.topContainer}>
                      <Image style={styles.image} source={{uri: "https://yt3.ggpht.com/-JGZxiRXR_s0/AAAAAAAAAAI/AAAAAAAAAAA/5gQ1m7P1s4U/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"}}/>
                        <Text style={styles.title}>Uncovered</Text>
                    </View>
                    <View style={[styles.buttonContainer]}>
                        {/* <SocialIcon
                            raised={false}
                            button
                            type='youtube'
                            title='Sign up with YouTube'
                            iconSize={22}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonTextYouTube}
                            onPress={this.onSignInWithFacebook}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                OR
                            </Text>
                        </View> */}

                        <Button
                            borderRadius={3}
                            title={'Sign up with E-mail'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>
                            <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={Actions.Login}>
                            <Text style={styles.signInText}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
            </View>
        );
    }
}


export default connect(null, {})(Welcome);