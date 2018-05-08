import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';
import { View, Text, Icon } from 'react-native-elements';

class TabIcon extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Icon
                        color={props.tintColor}
                        name={props.iconName}
                        size={26}
                    />
                </View>
            </View>
        )
    }

}

const styles = {
    container: {
        width: 48,
        height: 42,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default TabIcon;