import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class StoreInnerView extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Go To Detail Screen inner of Store" onPress={() => this.props.navigation.navigate('StoreInnerView')} />
            </View>
        );
    }
}
