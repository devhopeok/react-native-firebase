import React from 'react';
var {
    View,
    StyleSheet,
    Alert,
    Platform,
    Text,
    Image,
    TouchableHighlight,
    Linking,
    ListView,
    FlatList,
    ScrollView,
    StatusBar } = require('react-native');

import { Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { auth as authFB, database } from "../../../../config/firebase"
import styles from "./styles"
import { actions as auth, theme } from "../../../auth/index"
const { leaderboard } = auth;
const { color } = theme;


class TopUsersList extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.dataRef = database.ref("users");
    }

    listenForProfiles(dataRef){
        dataRef.orderByChild("ranking").on('value', (snap) => {
            let items = [];
            var count = 1;
            snap.forEach((child) => {
                items.push({
                    count: count,
                    username: child.val().username,
                    watchTime: child.val().watchTime,
                    photoURL: child.val().photoURL,
                    ranking: child.val().ranking
                });
                count++;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    componentWillMount() {
        this.listenForProfiles(this.dataRef);
    }

    _renderItem(item) {
        let urlImage = '';
        if(item.photoURL != null){
            urlImage = item.photoURL;
        } else {
            urlImage = 'https://firebasestorage.googleapis.com/v0/b/uncvrd-mobile-application.appspot.com/o/artist_ph.jpg?alt=media&token=3edade86-7b19-450b-9a15-1848677b5b16';
        }
        return(
            <View
                    style={styles.personalLeaderboard}
                >
                    <View
                        style={styles.leaderboardLeft}>
                        <Text
                            style={styles.personalRanking}
                        >
                            {item.count}
                        </Text>
                        <Avatar
                            small
                            rounded
                            source={{ uri: urlImage }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{ marginRight: 12 }}
                        />
                        <Text
                            style={styles.indiRankingName}>
                            {item.username}
                        </Text>
                    </View>
                    <View
                        style={styles.minutesContainer}>
                        <Text
                            style={styles.indiTotalMinutes}>
                            {item.watchTime}
                            </Text>
                        <Text
                            style={styles.indiTotalMinutesTitle}>
                            MINUTES
                            </Text>
                    </View>
                </View>
        );
        count++
    }

    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)}> </ListView>
            </View>
        );
    }
}

class Leaderboard extends React.Component {
    static navigationOptions = {
        title: "Leaderboard",
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
        this.state = {}


    }

    render() {
        return (
            <ScrollView>
                <TopUsersList />
            </ScrollView>
        );
    }

}

export default Leaderboard;