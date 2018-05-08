import React, { Component } from 'react';
var {
    View,
    StyleSheet,
    Alert,
    Platform,
    Text,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Linking,
    FlatList,
    Animated,
    StatusBar } = require('react-native');

import { Button, Icon, Avatar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { auth as authFB, database } from "../../../../config/firebase";
import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { video } = auth;

const { color } = theme;

import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

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
        let images = [];

        profileRef.child("viewers").on('child_added', (snap) => {
            images.push({
                photo: snap.val()
            });
            this.setState({ photoList: images })
        })
    }

    _renderItem = ({ item }) => {
        return (
            <View style={styles.recentViewer}>
                <Image
                    source={{ uri: item.photo }}
                    style={styles.recentViewersImage}
                />
            </View>
        );
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

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            photoURL: ''
        }

        this.userList = database.ref("users");

    }

    getUser = (list) => {
        let userN = '';
        let photo = '';
        let minutes = '';
        var user = authFB.currentUser;
        list.child(user.uid).once('value')
            .then((snapshot) => {
                this.setState({
                    username: snapshot.val().username,
                    photoURL: snapshot.val().photoURL,
                    minutes: snapshot.val().watchTime,
                })
            })
    }

    componentDidMount() {
        this.getUser(this.userList)
    }

    render() {
        //console.log(this.state.profArray.val());
        return (
            <View style={styles.userProfileContainer}>
                <Avatar
                    small
                    rounded
                    source={{ uri: this.state.photoURL }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{ marginRight: 12 }}
                />
                <View>
                    <Text
                        style={styles.indiRankingName}>
                        {this.state.username}
                    </Text>
                    <Text style={styles.minutesWatched}>
                        {this.state.minutes} MINUTES
            </Text>
                </View>
            </View>
        );
    }

}

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.userRef = database.ref('users');
        this.state = {
            isLiked: 0,
        }
    }

    componentDidMount(){
        this.listenForLikeStatus(this.userRef);
    }

    listenForLikeStatus = (userRef) => {
        var id = authFB.currentUser.uid;
        userRef.child(id + '/likedVideos/' + this.props.id).once('value')
        .then((snap) => {
            if(snap.val()){
                this.setState({ isLiked: 1 })
            }
        })   
    }

    likeVid = (id, userRef) => {
        userRef.child(authFB.currentUser.uid + '/likedVideos/').update({
            [id]: id
        })
        this.setState({ isLiked: 1 });
        database.ref('music/' + id + '/likes/').transaction(function(currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentClicks || 0) + 1;
        });
    }

    unlikeVid = (id, userRef) => {
        userRef.child(authFB.currentUser.uid + '/likedVideos/' + id).remove();
        this.setState({ isLiked: 0 });
        database.ref('music/' + id + '/likes/').transaction(function(currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentClicks || 0) - 1;
        });
    }

    render() {
        if(this.state.isLiked == 1) {
            return(
            <TouchableOpacity
                onPress={() => this.unlikeVid(this.props.id, this.userRef)}>
                <View style={styles.profileRight}>
                        <Icon
                        name='thumb-up'
                        size={14}
                        color='#FFF'
                    />
                    <Text style={[styles.commentBtnText, styles.commentBtnTextLiked]}>Liked</Text>
                </View>
            </TouchableOpacity>
            );
        } else {
            return(
            <TouchableOpacity
                onPress={() => this.likeVid(this.props.id, this.userRef)}>
                <View style={[styles.profileRight, styles.profileRightDislike]}>
                        <Icon
                        name='thumb-up'
                        size={14}
                        color='#FF0000'
                    />
                    <Text style={styles.commentBtnText}>Like</Text>
                </View>
            </TouchableOpacity>
            );
        }
        
    }
}

class Community extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Community',
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                color: 'black',
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
    }
    
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true,
        isLooping: true,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        containerMounted: false,
        containerWidth: null,
        elapsedTime: Date.now(),
        username: '',
        photoURL: '',
        userWatchTime: 0,
        animatedValue: new Animated.Value(0)
      };

      componentDidMount() {
        let userN = '';
        let photo = '';
        let minutes = '';
        var user = authFB.currentUser;
        database.ref('users').child(user.uid).once('value')
          .then((snapshot) => {
            this.setState({
              username: snapshot.val().username,
              photoURL: snapshot.val().photoURL,
              userWatchTime: snapshot.val().watchTime,
            })
          })
      }

    onButtonPress = () => {
        //this.props.navigation.navigate('SpotifyLogin')
    }
    render() {
        const { navigate } = this.props.navigation;
        var vidId = this.props.url
        return (
            <ScrollView
                style={styles.container}
                onLayout={({ nativeEvent: { layout: { width } } }) => {
                    if (!this.state.containerMounted) this.setState({ containerMounted: true });
                    if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
                }}
            >
                    {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyDw3X9VMWF9eeHsNTE_e2tahOtPsRPvdEU"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={vidId.split("https://youtu.be/")[1]}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />
        )}
                <View style={styles.videoMetaContainer}>
                    <Text style={styles.videoMetaTitle}>{this.props.title}</Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={Actions.Profile}>
                    <View style={styles.commentBtnContainer}>
                        <View>
                            <UserProfile />
                        </View>
                        <View>
                            <LikeButton id={this.props.id}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

export default connect(null, {})(Community);