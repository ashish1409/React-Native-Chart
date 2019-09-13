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
import { ScatterChart } from 'react-native-charts-wrapper';

class ScatterChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Scatter Chart',
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
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        textColor: processColor('darkgray'),
      },

      marker: {
        enabled: true,
        type: 'com.github.reactNativeMPAndroidChart.example.marker.OvalBlueMarker',
        markerColor: processColor('#df645c'),
        textColor: processColor('#f2f2f2'),
        digits: 2,
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
    };
  }

  componentDidMount() {
    const size = 30;
    const range = 20;

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: this._randomYValues(range, size),
              label: 'DS 1',
              config: {
                scatterShape: 'X',
                color: processColor('#aad34f'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              }
            }, {
              values: this._randomYValues(range, size),
              label: 'DS 2',
              config: {

                scatterShape: 'CIRCLE',
                scatterShapeHoleRadius: 6,
                scatterShapeHoleColor: processColor('#dc433f'),
                color: processColor('blue'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              }
            }, {
              values: this._randomYValues(range, size),
              label: 'DS 3',
              config: {

                drawHighlightIndicators: false,
                scatterShape: 'SQUARE',
                scatterShapeSize: 8,
                color: processColor('aad34f'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              }
            }],
          }
        }
      })
    );
  }

  _randomYValues(range: number, size: number) {
    return _.times(size, () => {
      return { y: Math.random() * range }
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
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.eventBox}>
          <View style={styles.eventBlock}>
            <Text style={styles.eventThumb}>
              <Thumbnail square source={require('../../assets/scatter-chart.png')} />
            </Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <ScatterChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            marker={this.state.marker}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
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


export default ScatterChartScreen;
