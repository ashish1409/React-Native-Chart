import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class HomeView extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Dashboard')} />
            </View>
        );
    }
}
