import React, { Component } from 'react';
import { View, Text } from 'react-native';

// import AxisLineChartScreen from './allCharts/AxisLineChartScreen';
// import BarChartScreen from './allCharts/BarChartScreen';
// import BubbleChartScreen from './allCharts/BubbleChartScreen';


// import CandleStickChartScreen from './allCharts/CandleStickChartScreen';
// import ChartsListScreen from './allCharts/ChartsListScreen';
// import CombinedChartScreen from './allCharts/CombinedChartScreen';


// import GroupBarChartScreen from './allCharts/GroupBarChartScreen';
// import HorizontalBarChartScreen from './allCharts/HorizontalBarChartScreen';
// import InfiniteScrollLineChartScreen from './allCharts/InfiniteScrollLineChartScreen';


// import LineChartGradientScreen from './allCharts/LineChartGradientScreen';
// import LineChartScreen from './allCharts/LineChartScreen';
// import LinkageChartScreen from './allCharts/LinkageChartScreen';


// import LiveUpdateChartScreen from './allCharts/LiveUpdateChartScreen';
// import MovingWindowChartScreen from './allCharts/MovingWindowChartScreen';
// import MultipleChartScreen from './allCharts/MultipleChartScreen';


// import PieChartScreen from './allCharts/PieChartScreen';
// import RadarChartScreen from './allCharts/RadarChartScreen';
// import ScatterChartScreen from './allCharts/ScatterChartScreen';

// import StackedBarChartScreen from './allCharts/StackedBarChartScreen';
// import StockChartScreen from './allCharts/StockChartScreen';
// import TimeSeriesLineChartScreen from './allCharts/TimeSeriesLineChartScreen';

import ZeroLineChartScreen from './allCharts/ZeroLineChartScreen';

class StoreInnerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <AxisLineChartScreen />
                <BarChartScreen />
                <BubbleChartScreen />

                <CandleStickChartScreen />
                <ChartsListScreen />
                <CombinedChartScreen />

                <GroupBarChartScreen />
                <HorizontalBarChartScreen />
                <InfiniteScrollLineChartScreen />

                <LineChartGradientScreen />
                <LineChartScreen />
                <LinkageChartScreen />

                <LiveUpdateChartScreen />
                <MovingWindowChartScreen />
                <MultipleChartScreen />

                <PieChartScreen />
                <RadarChartScreen />
                <ScatterChartScreen />

                <StackedBarChartScreen />
                <StockChartScreen />
                <TimeSeriesLineChartScreen /> */}

                <ZeroLineChartScreen />
            </View>
        );
    }
}

export default StoreInnerView;
