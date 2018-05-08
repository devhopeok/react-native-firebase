import React from 'react';
import { Actions } from 'react-native-router-flux';
import { TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions as auth } from "../../index"
import { auth as authFB, database } from "../../../../config/firebase"
import Form from "../../components/Form";
import uuid from 'uuid';
import { Button, Icon, Avatar } from 'react-native-elements'
import styles from "./styles"
const { login } = auth;

const fields = [
    {
        key: 'link',
        label: null,
        placeholder: "YouTube Link",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "url"
    },
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Submit extends React.Component {
    static navigationOptions = {
        title: "Submit",
        headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'black'
        },
        tabBarIcon: ({ tintColor, focused }) => (
            <View style={{ width: 30, height: 30 }}>
                <Icon
                    name='ios-add-circle-outline'
                    type='ionicon'
                    color={focused ? '#FF0000' : '#aaa'}
                />
            </View>
        )
    }
    constructor() {
        super();
        this.state = {
            error: error,
            username: '',
            watchTime: 0,
            photoURL: '',
        }

        this.userRef = database.ref('users');

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    // getData() {
    //     return fetch("https://www.youtube.com/oembed?format=json&url=https://youtu.be/1u5-BYNkaFU")
    //     .then(response => {
    //       console.log(response);
    //       return response.json();
    //     })
    //     .then(responseJson => {
    //       console.log(responseJson)
    //     })
    //     .catch(error => {
    //     console.error(error);
    //     });
    // }

    getUsername = (userRef) => {
        var id = authFB.currentUser.uid;
        userRef.child(id).once('value')
            .then((snap) => {
                this.setState({
                    username: snap.val().username,
                    watchTime: snap.val().watchTime,
                    photoURL: snap.val().photoURL,
                })
            })
    }

    componentDidMount() {
        this.getUsername(this.userRef);
    }

    onSubmit(data) {
        this.setState({ error: error }); //clear out error messages
        var submittedLink = data.link;
        var jsonUrl = 'https://www.youtube.com/oembed?format=json&url=' + submittedLink;
        var youtubeData = getData(jsonUrl, submittedLink, this.state.username);
        Actions.reset("Main");
    }

    onSuccess() {
        Actions.Home({type: "reset"})
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({ error: errObj });
    }

    render() {
        const formSubmit = (<View style={styles.masterCenteringContainer}>
        <Text style={styles.submitText}>Share a song with the UNCVRD community. YouTube links only (for now).</Text>
        <Form fields={fields}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={"Submit"}
            error={this.state.error} />
        </View>
        );

        const watchTimeCheck = (<View style={styles.masterCenteringContainer}>
            <Text style={styles.submitTextHeader}>Become an UNCVRD contributor</Text>
            <Text style={styles.submitText}>To submit music to the community:</Text>
            <Text style={styles.submitText}>- Watch 30 minutes of music</Text>
            <View style={styles.centeringContainer}>
                <View style={styles.profileContainer}>
                    <Avatar
                        medium
                        rounded
                        source={{ uri: this.state.photoURL }}
                        onPress={() => this.incremented()}
                        activeOpacity={0.7}
                        containerStyle={{ marginRight: 12 }}
                    />
                    <Text>
                        {this.state.username}
                    </Text>
                </View>
                <Text style={styles.minutesWatched}>
                    {this.state.watchTime}
                </Text>
                <Text style={styles.minutesText}>
                    MINUTES
            </Text>
            </View>
            <Button
                raised={false}
                borderRadius={3}
                title={'Start watching'}
                buttonStyle={[styles.button]}
                textStyle={styles.buttonText}
                onPress={() => { Actions.Music() }} />
        </View>);

        const watchTime = (this.state.watchTime > 30) ? (formSubmit) : (watchTimeCheck);

        return (
            <View style={{ flex: 1 }}>
                {watchTime}
            </View>
        );

    }
}

function getData(url, originalLink, username) {
    return fetch(url)
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .then(responseJson => {
            var id = uuid.v4();
            var musicRef = database.ref("music").child(id);
            musicRef.update({
                id: id,
                youtubeURL: originalLink,
                thumbnail: responseJson.thumbnail_url,
                title: responseJson.title,
                date: 0 - Date.now(),
                likes: 0,
                submittedBy: username,
            });
            return 1;
        })
        .catch(error => {
            console.error(error);
        });
}

export default connect(null, {})(Submit);