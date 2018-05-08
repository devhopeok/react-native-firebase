import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/redux/store';

import { auth as authFB, database } from "./app/config/firebase";
console.disableYellowBox = true;

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {CabinBold: require('./app/assets/fonts/Cabin-Bold.ttf')},
            {CabinMedium: require('./app/assets/fonts/Cabin-SemiBold.ttf')},
            {CabinRegular: require('./app/assets/fonts/Cabin-Regular.ttf')},
            {SFBold: require('./app/assets/fonts/SF-Pro-Text-Bold.otf')},
            {SFMedium: require('./app/assets/fonts/SF-Pro-Text-Semibold.otf')},
            {SFRegular: require('./app/assets/fonts/SF-Pro-Text-Regular.otf')},
            {SFLight: require('./app/assets/fonts/SF-Pro-Text-Light.otf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}