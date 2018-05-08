import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';
import { View, Text, Icon } from 'react-native-elements';
//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import Video from '../modules/home/scenes/Video';
import Profile from '../modules/profile/scenes/Profile';
import Leaderboard from '../modules/profile/scenes/Leaderboard';
import Submit from '../modules/auth/scenes/Submit';
import Community from '../modules/home/scenes/Community';
import Music from '../modules/home/scenes/Music'

import { StackNavigator } from 'react-navigation';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";


import { color, navTitleStyle } from "../styles/theme";
  
import TabIcon from '../components/TabIcon';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    
    }

    tabIcon = () => {
        alert('run');
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                        navigationBarStyle={{backgroundColor: "#fff"}}
                        titleStyle={navTitleStyle}
                        backButtonTintColor={color.black}
                >
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>
                    <Scene key="Main" 
                        tabs={true}
                        activeTintColor='#FF0000'
                        inactiveTintColor='#aaa' 
                        initial={this.state.isLoggedIn}>                      
                            <Scene key="Home" backToInitial={true}>
                                <Scene key="Home" component={Home} title="Home" initial={true}/>
                                <Scene key="Video" component={Video} title="Video" />
                                <Scene key="Community" component={Community} title="Community"/>
                            </Scene>
                            <Scene key="Music" backToInitial={true}>
                                <Scene key="Music" component={Music} title="Music" />
                            </Scene>
                            
                            <Scene type={ActionConst.RESET}
                                key="Submit" 
                                component={Submit} 
                                title="Submit"
                            />
                            <Scene key="Profile" backToInitial={true}>
                                <Scene key="Profile" component={Profile} title="Profile"/>
                                <Scene key="Leaderboard" component={Leaderboard} title="Leaderboard"/>
                            </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}