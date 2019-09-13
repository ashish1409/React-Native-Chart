import React, { Component } from 'react';
import { View } from 'react-native';
import ChartsListScreen from './src/allCharts/ChartsListScreen';
export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ChartsListScreen />
      </View>
    );
  }
}