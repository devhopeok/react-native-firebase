import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                        <Image style={styles.image} source={{uri: "https://yt3.ggpht.com/-JGZxiRXR_s0/AAAAAAAAAAI/AAAAAAAAAAA/5gQ1m7P1s4U/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"}}/>
                    <Text style={styles.title}>Uncovered</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}