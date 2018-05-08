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

class Video extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Video',
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

  incrementWatchTime = (time) => {
    if ((time - this.state.elapsedTime) > 1200) {
      var id = authFB.currentUser.uid;
      database.ref('users/' + id + '/watchTime/').transaction(function (currentClicks) {
        // If node/clicks has never been set, currentRank will be `null`.
        return (currentClicks || 0) + 1;
      });
      database.ref('users/' + id + '/ranking/').transaction(function (currentClicks) {
        // If node/clicks has never been set, currentRank will be `null`.
        return (currentClicks || 0) - 1;
      });

      this.setState({
        elapsedTime: time,
        userWatchTime: this.state.userWatchTime + 1,
      });

      this.state.animatedValue.setValue(0);
      Animated.timing(this.state.animatedValue, {
        toValue: 300,
        duration: 2000
      }).start();

    }
  }

  onButtonPress = () => {
    //this.props.navigation.navigate('SpotifyLogin')
  }
  render() {
    const { navigate } = this.props.navigation;
    const interpolateColor = this.state.animatedValue.interpolate({
      inputRange: [0, 150, 300],
      outputRange: ['rgb(102,102,102)', 'rgb(255,0,0)', 'rgb(102,102,102)']
    })
    const animatedStyle = {
      color: interpolateColor,
      // transform: [
      //   { translateY: this.animatedValue }
      // ]
    }
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
            videoId={this.props.vidId}
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
          <Text style={styles.videoMetaTitle}>{this.props.vidTitle}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={Actions.Profile}>
          <View style={styles.commentBtnContainer}>
            <View>
              <View style={styles.userProfileContainer}>
                <Avatar
                  small
                  rounded
                  source={{ uri: this.state.photoURL }}
                  onPress={() => this.incremented()}
                  activeOpacity={0.7}
                  containerStyle={{ marginRight: 12 }}
                />
                <View>
                  <Text
                    style={styles.indiRankingName}>
                    {this.state.username}
                  </Text>
                  <Animated.Text style={[styles.minutesWatched, animatedStyle]}>
                    {this.state.userWatchTime} MINUTES
                  </Animated.Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
            onPress={() => {Linking.openURL('youtube://youtu.be/'+ this.props.vidId)}}
            >
              <View style={styles.profileRight}>
                <Icon
                  name='youtube-play'
                  type='material-community'
                  color='#ff0000'
                  size={14}
                />
                <Text style={styles.commentBtnText}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.pageHeader}>
          Recent Viewers
          </Text>
        <View style={styles.recentViewerList}>
          <ScrollView>
            <RecentViewersProfile />
          </ScrollView>
        </View>
        {/* Show Progress */}
        {(((Math.trunc(this.state.currentTime) % 60) == 0) && (Math.trunc(this.state.currentTime) > 1)) ? this.incrementWatchTime(Date.now()) : null}
      </ScrollView>
    );
  }
}

export default connect(null, {})(Video);