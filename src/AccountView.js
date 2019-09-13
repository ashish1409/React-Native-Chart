import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AxisLineChartScreen from './allCharts/AxisLineChartScreen'

export default class AccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (

            <AxisLineChartScreen />

        );
    }
}
