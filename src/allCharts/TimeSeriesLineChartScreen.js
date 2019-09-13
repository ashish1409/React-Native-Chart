import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import _ from 'lodash';
import { LineChart } from 'react-native-charts-wrapper';

class TimeSeriesLineChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Time Series Chart',
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
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('#f2f2f2'),
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        textColor: processColor('darkgray'),
        custom: {
          colors: [processColor('#f2f2f2'), processColor('#f2f2f2')],
          labels: ['REFER', 'USER',]
        }
      },
      marker: {
        enabled: true,
        markerColor: processColor('#df645c'),
        textSize: 14,
        textColor: processColor('#f2f2f2'),
        markerFontSize: 14,
      },

      selectedEntry: "",
      xAxis: {
        drawLabels: false,
        granularity: 1,
        granularityEnabled: true,
        valueFormatter: 'date',
        valueFormatterPattern: 'MM-dd',
        since: 0,
        timeUnit: 'DAYS',
        textSize: 14,
        textColor: processColor('#a9b0bb'),
      },
      yAxis: { left: { axisMaximum: 12000, enabled: true, textColor: processColor('darkgray'), textSize: 14 }, right: { enabled: true, position: 'OUTSIDE_CHART', textColor: processColor('darkgray'), textSize: 14 } },
    }

  }

  componentDidMount() {
    const size = 80;

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: this._randomParabolaValues(size),
              label: 'refer',
              config: {
                lineWidth: 2,
                drawValues: false,
                drawCircles: false,
                highlightColor: processColor('#df645c'),
                color: processColor('#df645c'),
                drawFilled: true,
                fillColor: processColor('#df645c'),
                fillAlpha: 60,
                highlightEnabled: false,
                textSize: 14,
                textColor: processColor('#a9b0bb'),

                dashedLine: {
                  lineLength: 20,
                  spaceLength: 20
                }
              }
            }, {
              values: [
                { x: 1, y: 11000, marker: "a very long long long long long long long long \nmarker at top left" },
                { x: 20, y: 90, marker: "eat eat eat, never\n stop eat" },
                { x: 40, y: -130, marker: "" },
                { x: 65, y: 11000, marker: "test top center marker" },
                { x: 70, y: -2000, marker: "eat more" },
                { x: 90, y: 9000, marker: "your are overweight, eat less" },
                { x: 100, y: 11000, marker: "test top right marker" }],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('#df645c'),
                drawFilled: true,
                valueTextSize: 14,
                valueTextColor: processColor('#a9b0bb'),
                fillColor: processColor('#f7a900'),
                fillAlpha: 10,
                valueFormatter: "$###.0",
                circleColor: processColor('green'),
                textColor: processColor('darkgray'),



              }
            }],
          }
        }
      })
    );
  }

  _randomParabolaValues(size: number) {
    return _.times(size, (index) => {
      return { x: index, y: index * index }
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }

    console.log(event.nativeEvent)
  }

  render() {

    let borderColor = processColor("#f2f2f2");
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.eventBox}>
          <View style={styles.eventBlock}>
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/timeline-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>


        <View style={styles.container}>


          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            marker={this.state.marker}

            drawGridBackground={false}

            borderColor={borderColor}
            borderWidth={1}
            drawBorders={true}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}


            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}

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

export default TimeSeriesLineChartScreen;
