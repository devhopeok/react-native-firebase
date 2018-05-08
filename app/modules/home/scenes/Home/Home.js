import React from 'react';
var {
    View,
    StyleSheet,
    Alert,
    Platform,
    Text,
    Image,
    ImageBackground,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Linking,
    ScrollView,
    ListView,
    FlatList,
    StatusBar } = require('react-native');

import { Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { auth as authFB, database } from "../../../../config/firebase"
import uuid from 'uuid';
import styles from "./styles";
import { LinearGradient, Permissions, Notifications } from 'expo';
import FadeInImage from '../../../../components/FadeInImage'
import { actions as auth, theme } from "../../../auth/index";
const { signOut } = auth;

const { color } = theme;

async function registerForPushNotificationsAsync(user) {
    const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
      alert(token);
      var updates = {}
      updates['/expoToken'] = token;
      database.ref('users').child(user.uid).update(updates)
}

class TopUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] }
        this.userRef = database.ref("users");
    }

    componentDidMount() {
        this.listenForUsers(this.userRef);
    }

    listenForUsers = (userRef) => {
        userRef.orderByChild("ranking").limitToFirst(10).on('child_added', (snap) => {
            let items = this.state.userList;
            items.push({
                username: snap.val().username,
                photoURL: snap.val().photoURL,
                watchTime: snap.val().watchTime,
            });
            this.setState({ userList: items });
        });
    }

    _renderUserItem = (item) => {
        let urlImage = '';
        if (item.photoURL != null) {
            urlImage = item.photoURL;
        } else {
            urlImage = 'https://firebasestorage.googleapis.com/v0/b/uncvrd-mobile-application.appspot.com/o/artist_ph.jpg?alt=media&token=3edade86-7b19-450b-9a15-1848677b5b16';
        }
        return (
            <View style={styles.indiTopProfContainer}>
                <View style={styles.topUserProfile}>
                    <FadeInImage
                        source={{ uri: urlImage }}
                        style={styles.userProfPic} />
                </View>
                <View style={styles.indiTopUserBottomContainer}>
                    <Text style={styles.topUsernameFont}>{item.username}</Text>
                    <Text style={styles.topMinutesFont}>{item.watchTime}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.topUserListContainer}>
                <FlatList
                    horizontal={true}
                    data={this.state.userList}
                    renderItem={({ item }) => this._renderUserItem(item)}
                />
            </View>
        )
    }
}

class VideoFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { itemList: [] };
        this.realList = database.ref("music"); // create property
        this.userRef = database.ref("users");
    }

    componentDidMount() {
        this.listenForMusic(this.realList, this.userRef); // pass property to listener method
    }

    listenForMusic = (list, userRef) => { // listener method
        list.orderByChild("date").on('child_added', (snap) => {
            let items = this.state.itemList;
            items.push({
                id: snap.val().id,
                videoURL: snap.val().youtubeURL,
                title: snap.val().title,
                thumbnail: snap.val().thumbnail,
                likes: snap.val().likes,
                submittedBy: snap.val().submittedBy
            });
            this.setState({ itemList: items }); // update state
        });
    }

    _renderVideoItem = (item) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Actions.Community({
                        title: item.title,
                        url: item.videoURL,
                        id: item.id,
                    })
                }}
            >
                {/* <View style={styles.mediaContainer}>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.mediaThumbnail}
                    />
                    <View style={styles.mediaMetaContainer}>
                        <View style={styles.topMetaContainer}>
                            <Text style={styles.mediaTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.sharedByUser}>
                                {item.submittedBy}
                                </Text>
                        </View>
                        <View style={styles.bottomMetaContainer}>
                            <Icon
                                name='youtube-play'
                                type='font-awesome'
                                color='#ff0000'
                                size={14}
                            />
                            <View style={styles.bottomRightContainer}>
                                <Icon
                                    name='thumb-up'
                                    size={12}
                                    color='#aaa'
                                />
                                <Text style={styles.metaLikeCounter}>
                                    {item.likes}
                                    </Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <View style={styles.indiMediaContainer}>
                    <FadeInImage
                        source={{ uri: item.thumbnail }}
                        style={styles.indiMediaThumbnail} />                    
                        <LinearGradient
                            style={styles.linGradMedia}
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} >
                            <View style={styles.mediaTextContainer}>
                                <Text style={styles.mediaTextTitle}>{item.title}</Text>
                                <Text style={styles.mediaTextBy}>By</Text>
                                <Text style={styles.mediaTextSubmittedBy}>{item.submittedBy} </Text>
                            </View>
                        </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.itemList}
                    renderItem={({ item }) => this._renderVideoItem(item)}
                />
            </View>
        );
    }
}

class RecentViewersProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photoList: [] };
        this.profileRef = database.ref('recentUpload');
        this.userRef = database.ref("users");
    }

    componentDidMount() {
        this.listenForViewers(this.profileRef); // pass property to listener method
    }

    listenForViewers = (profileRef) => {
        var images = [];

        profileRef.child("viewers").on('child_added', (snap) => {
            let real = [...this.state.photoList];
            real.push({
                photo: snap.val()
            });
            this.setState({ photoList: real });
        });
    }

    _renderItem = ({ item, index }) => {
        let urlImage = '';
        if (item.photo != null) {
            urlImage = item.photo;
        } else {
            urlImage = 'https://firebasestorage.googleapis.com/v0/b/uncvrd-mobile-application.appspot.com/o/artist_ph.jpg?alt=media&token=3edade86-7b19-450b-9a15-1848677b5b16';
        }
        if (index == 0) {
            return (
                <View style={styles.recentViewersProfile}>
                    <FadeInImage
                        source={{ uri: urlImage }}
                        style={styles.recentViewersImage} />
                </View>
            );
        } else {
            return (
                <View style={[styles.recentViewersProfile, {marginLeft: -8}]}>
                    <FadeInImage
                        source={{ uri: urlImage }}
                        style={styles.recentViewersImage} />
                </View>
            );
        }
        
    }

    render() {

        return (
            <FlatList
                horizontal={true}
                data={this.state.photoList}
                renderItem={this._renderItem}
            />
        );
    }
}

class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'black'
        },
        tabBarIcon: ({ tintColor, focused }) => (
            <View style={{ width: 30, height: 30 }}>
                <Icon
                    name='ios-home'
                    type='ionicon'
                    color={focused ? '#FF0000' : '#aaa'}
                />
            </View>
        )
    }
    constructor() {
        super();
        this.state = {
            recentVidThumb: '',
            recentVidTitle: '',
            recentVidId: '',
        }
        this.userViewRef = database.ref('recentUpload');
    }

    pullHomeData = (data) => {
        this.userViewRef.child('youtubeURL').once('value', (data) => {
            var jsonUrl = 'https://www.youtube.com/oembed?format=json&url=' + data.val();
            return fetch(jsonUrl)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(responseJson => {
                    var id = data.val().split("https://youtu.be/")[1];
                    this.setState({
                        recentVidThumb: responseJson.thumbnail_url,
                        recentVidTitle: responseJson.title,
                        recentVidId: id,
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }

    componentDidMount() {
        this.pullHomeData(this.recentUploadRef);
        var user = authFB.currentUser;
        registerForPushNotificationsAsync(user)
    }

    onVideoPress = (data) => {
        var user = authFB.currentUser;
        var uid = user.uid
        if (user) {
            database.ref('users').child(user.uid).once('value')
                .then((snapshot) => this.userViewRef.child('viewers').update({ [uid]: snapshot.val().photoURL }))
                .catch(error => console.log(error))
        } else {
            this.setState({ profileImage: 'https://www.placeholdit.com' });
            console.log("No user")
        }
        Actions.Video({
            vidId: this.state.recentVidId,
            vidTitle: this.state.recentVidTitle
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.scrollBackground}>
                <View style={styles.homeContainer}>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <View style={styles.recentUploadContainer}>
                        <TouchableHighlight
                            onPress={this.onVideoPress}
                        >
                            <View style={styles.recentThumbContainer}>
                                <FadeInImage source={{ uri: this.state.recentVidThumb }} style={styles.thumbnail} />
                            </View>

                        </TouchableHighlight>
                        <View style={styles.recentCenteringContainer}>
                            <View style={styles.recentVidProfile}>
                                <FadeInImage source={{ uri: 'https://yt3.ggpht.com/-JGZxiRXR_s0/AAAAAAAAAAI/AAAAAAAAAAA/5gQ1m7P1s4U/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg' }} style={styles.uncvrdProfilePic} />
                            </View>
                            <View style={styles.recentVidMeta}>
                                <TouchableWithoutFeedback
                                    onPress={this.onVideoPress}>
                                    <Text style={styles.recentVidTitle}>
                                        {this.state.recentVidTitle}
                                    </Text>
                                </TouchableWithoutFeedback>
                                <View style={styles.recentViewersContainer}>
                                    <RecentViewersProfile />
                                    <Text style={styles.recentViewersText}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <StatusBar
                            barStyle="dark-content"
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.pageHeader}>
                        Top Users
            </Text>
                    <TopUsers />
                </View>
                <Text style={styles.pageHeaderCommunity}>
                    Community Posts
            </Text>
                <View style={styles.videoFeedContainer}>
                    <VideoFeed />
                </View>
            </ScrollView>

        );
    }
}

export default connect(null, { signOut })(Home);



