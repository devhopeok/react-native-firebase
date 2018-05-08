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
  Animated,
  FlatList,
  StatusBar } = require('react-native');

import { Button, Icon, Avatar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { auth as authFB, database } from "../../../../config/firebase";
import styles from "./styles"
import FadeInImage from '../../../../components/FadeInImage'
import { actions as auth, theme } from "../../../auth/index"
const { video } = auth;

const { color } = theme;

import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

class Music extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Music',
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
            name="ios-musical-notes"
            type="ionicon"
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
    isPlaying: false,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
    elapsedTime: Date.now(),
    username: '',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/uncvrd-mobile-application.appspot.com/o/artist_ph.jpg?alt=media&token=3edade86-7b19-450b-9a15-1848677b5b16',
    userWatchTime: 0,
    animatedValue: new Animated.Value(0)
  };

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

  componentDidUnmount() {
    this.setState({ isPlaying: false });
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
            //videoId={this.props.vidId}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            playlistId="PLTzXf6BfROEktE823y4AuhQrvJP2ZuX6q"
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
          <Text style={styles.videoMetaTitle}>Endless Playlist Mode</Text>
        </View>
        <View style={styles.masterCenteringContainer}>
        <TouchableWithoutFeedback
          onPress={Actions.Profile}>
          <View style={styles.centeringContainer}>
              <View style={styles.profileContainer}>
                <Avatar
                  medium
                  rounded
                  source={{ uri: this.state.photoURL }}
                  onPress={() => Actions.Profile()}
                  activeOpacity={0.7}
                  containerStyle={{ marginRight: 12 }}
                />
                  <Text>
                    {this.state.username}
                  </Text>
              </View>
              <Animated.Text style={[styles.minutesWatched, animatedStyle]}>
                    {this.state.userWatchTime}
              </Animated.Text>
              <Text style={styles.minutesText}>
              MINUTES
              </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.videoMetaTitle}>Watch time rewards coming soon!</Text>
        </View>
        {/* Show Progress */}
        {(((Math.trunc(this.state.currentTime) % 60) == 0) && (Math.trunc(this.state.currentTime) > 1)) ? this.incrementWatchTime(Date.now()) : null}
      </ScrollView>
    );
  }
}

export default connect(null, {})(Music);