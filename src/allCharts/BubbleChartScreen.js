import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ImageBackground
} from 'react-native';
import update from 'immutability-helper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import _ from 'lodash';
import { BubbleChart } from 'react-native-charts-wrapper';

class BubbleChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Bubble Chart',
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
        horizontalAlignment: "LEFT",
        verticalAlignment: "TOP",
        orientation: "HORIZONTAL",
      },
      animation: {
        durationX: 1500,
        durationY: 1500,
        easingX: 'EaseInCirc'
      },
      highlights: [{ x: 3 }, { x: 6 }],
      xAxis: {
        valueFormatter: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
    const size = 10;
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: this._randomYValues(20, size),
              label: 'DS 1',
              config: {
                color: processColor('#C0FF8C'),
                highlightCircleWidth: 2,
              }
            }, {
              values: this._randomYValues(20, size),
              label: 'DS 2',
              config: {
                color: processColor('#FFF78C'),
              }
            }, {
              values: this._randomYValues(20, size),
              label: 'DS 3',
              config: {
                textColor: processColor('#a9b0bb'),
              }
            }],
          }
        }
      })
    );
  }

  _randomYValues(range: number, size: number) {
    return _.times(size, (index) => {
      return {
        y: Math.random() * range,
        size: Math.random() * range,

      };
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
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/bubble.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>


        <View style={styles.container}>
          <BubbleChart
            style={styles.chart}
            data={this.state.data}
            legend={this.state.legend}
            animation={this.state.animation}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={{ text: '' }}
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

export default BubbleChartScreen;
