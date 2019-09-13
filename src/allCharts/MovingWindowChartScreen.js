import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import { LineChart } from 'react-native-charts-wrapper';
const CustomColor1 = "rgb(223, 100, 92)";
class MovingWindowChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving Window Chart',
    headerStyle: {
      backgroundColor: '#df645c',
    },
    headerTintColor: '#f2f2f2',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  constructor() {
    super();

    this.state = {
      data: {

        dataSets: [{
          values: Array.from(new Array(100), (val, index) => index),
          label: 'Company X',
          config: {
            mode: "CUBIC_BEZIER",
            highlightAlpha: 90,
            valueTextColor: processColor('#a9b0bb'),
            valueTextSize: 14,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor(CustomColor1),
            circleRadius: 5,
            drawValues: false,
            drawCircleHole: true,
            highlightColor: processColor("transparent"),
            color: processColor(CustomColor1),
            drawFilled: true,
            fillGradient: {
              colors: [processColor('#f7b532'), processColor('#df645c')],
              positions: [0, 0.5],
              angle: 90,
              orientation: "TOP_BOTTOM"
            },
            fillAlpha: 1000,
            valueTextSize: 15
          },
        }, {
          values: Array.from(new Array(100), (val, index) => index + 15),
          label: 'Company Y',
          config: {
            mode: "CUBIC_BEZIER",
            highlightAlpha: 90,
            valueTextColor: processColor('#a9b0bb'),
            valueTextSize: 14,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor(CustomColor1),
            circleRadius: 5,
            drawValues: false,
            drawCircleHole: true,
            highlightColor: processColor("transparent"),
            color: processColor(CustomColor1),
            drawFilled: true,
            fillGradient: {
              colors: [processColor('#f7b532'), processColor('#df645c')],
              positions: [0, 0.5],
              angle: 90,
              orientation: "TOP_BOTTOM"
            },
            fillAlpha: 1000,
            valueTextSize: 15


          },
        }]
      },
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 25,
        wordWrapEnabled: true,
        textColor: processColor('darkgray'),
        horizontalAlignment: "LEFT",
        verticalAlignment: "BOTTOM",
        orientation: "HORIZONTAL",
      },
      marker: {
        enabled: true,
        digits: 2,
        markerColor: processColor('#df645c'),
        textColor: processColor('#f2f2f2'),
        enabled: true,
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
        textSize: 14,
        textColor: processColor('#a9b0bb'),

      },
      yAxis: {
        left: {
          granularityEnabled: true,
          granularity: 1,
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        },
        right: {
          granularityEnabled: true,
          granularity: 1,
          textSize: 14,
          textColor: processColor('#a9b0bb'),

        }

      }
    }
  }

  componentDidMount() {
    this.refs.chart.moveViewToAnimated(100, 0, 'left', 20000)
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>

        <View style={styles.container}>

          <LineChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={this.state.legend}
            chartDescription={{ text: '' }}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            dragDecelerationEnabled={false}
            dragDecelerationFrictionCoef={0.99}
            zoom={{ scaleX: 5, scaleY: 1, xValue: 0, yValue: 0 }}
            ref="chart"
          />
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#15222d'
  },
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
  eventBox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventBlock: {
    flexDirection: 'column',
  },

  eventMonth: {
    fontSize: 14,
    color: "#a9b0bb",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
    backgroundColor: 'rgba(0,0,0,.2)',
    padding: 10,
    borderRadius: 10
  },
  description: {
    fontSize: 15,
    color: "#a9b0bb",
  },

  userData: {
    fontSize: 14,
    color: "#a9b0bb",
  },
});


export default MovingWindowChartScreen;
