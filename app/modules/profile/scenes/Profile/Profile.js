import React from 'react';
var {
    ActivityIndicator,
    Clipboard,
    Share,
    TouchableHighlight,
    View,
    StyleSheet,
    Alert,
    Platform,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    ScrollView,
    StatusBar } = require('react-native');

import { Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, ImagePicker } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import { auth as authFB, database } from "../../../../config/firebase"
import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut, profile } = auth;

const { color } = theme;

class Profile extends React.Component {
    static navigationOptions = {
        title: "Profile",
        headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'black'
        },
        tabBarIcon: ({tintColor, focused}) => (
            <View style={{width: 30, height: 30}}>
                <Icon name="ios-person" type="ionicon" color = {focused ? '#FF0000' : '#aaa'}/>
            </View>
        )
    }
    constructor() {
        super();
        this.state = {
            image: null,
            uploading: null,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/uncvrd-mobile-application.appspot.com/o/artist_ph.jpg?alt=media&token=3edade86-7b19-450b-9a15-1848677b5b16',
            username: '',
            watchTime: 0,
        }

        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }
    onVideoPress = () => {
        Actions.Video()
    }

    componentWillMount(){
        var user = authFB.currentUser;
        if (user) {
        database.ref('users').child(user.uid).once('value')
        .then((snapshot) => this.setState({ 
            profileImage: snapshot.val().photoURL,
            username: snapshot.val().username,
            watchTime: snapshot.val().watchTime,
        }))
        .catch(error => console.log(error))
        } else {
          this.setState({ profileImage: 'https://www.placeholdit.com' });
          console.log("No user")
        }
    }

    render() {

        const { navigate } = this.props.navigation;
        let { profileImage, username, watchTime } = this.state;
        
        return (
            <ScrollView>
                <View style={styles.profileTopContainer}>
                    <Avatar
                        large
                        rounded
                        source={{ uri: profileImage }}
                        onPress={() => alert(profileImage)}
                        activeOpacity={0.7}
                        containerStyle={{ marginBottom: 12 }}
                    />
                    <Text
                        style={styles.usernameText}
                    >
                        {username}
                    </Text>
                    <TouchableOpacity
                        onPress={this._pickImage}>
                        <Text
                            style={styles.userMinutes}
                        >
                            Choose a profile picture
                        </Text>
                    </TouchableOpacity>

                </View>
                <View
                    style={styles.mainContainer}
                >
                    <View
                        style={styles.leaderboardContainer}
                    >
                        <Text
                            style={styles.leaderboardTitle}
                        >
                            LEADERBOARD
                        </Text>
                        <TouchableOpacity
                            onPress={() => Actions.Leaderboard()}
                        >
                            <Text
                                style={styles.leaderboardButton}
                            >
                                View >
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => Actions.Leaderboard()}>
                        <View
                            style={styles.personalLeaderboard}
                        >
                            <View
                                style={styles.leaderboardLeft}>
                                <Avatar
                                    small
                                    rounded
                                    source={{ uri: profileImage }}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                    containerStyle={{ marginRight: 12 }}
                                />
                                <Text
                                    style={styles.indiRankingName}>
                                    {username}
                                </Text>
                            </View>
                            <View
                                style={styles.minutesContainer}>
                                <Text
                                    style={styles.indiTotalMinutes}>
                                    {watchTime}
                            </Text>
                                <Text
                                    style={styles.indiTotalMinutesTitle}>
                                    MINUTES
                            </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Button
                        raised={false}
                        borderRadius={3}
                        title={'Log out'}
                        containerViewStyle={{ width: '100%', marginLeft: 0 }}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.onSignOut} />
                </View>

                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}

            </ScrollView>
        )
    };
    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let { image } = this.state;
        if (!image) {
            return;
        }

        var user = authFB.currentUser;
        if (user) {
        database.ref('users').child(user.uid).update({photoURL: image})
        .then(() => this.setState({ profileImage: image }))
        .catch(error => console.log(error))
        } else {
        console.log("No user")
        }

        return (null);
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());

    const task = ref.put(blob);

    return new Promise((resolve, reject) => {
        task.on(
            'state_changed',
            () => {
                /* noop but you can track the progress here */
            },
            reject /* this is where you would put an error callback! */,
            () => resolve(task.snapshot.downloadURL)
        );
    });
}

export default connect(null, { signOut })(Profile);