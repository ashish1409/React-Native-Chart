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
import { RadarChart } from 'react-native-charts-wrapper';


class RadarChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Radar Chart',
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
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        textColor: processColor('darkgray'),
        horizontalAlignment: "LEFT",
        verticalAlignment: "TOP",
        orientation: "HORIZONTAL",
        textColor: processColor('darkgray'),
      }
    };
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [{ value: 100 }, { value: 110 }, { value: 105 }, { value: 115 }, { value: 110 }],
              label: 'DS 1',
              config: {
                color: processColor('yellow'),
                drawFilled: true,
                fillColor: processColor('yellow'),
                fillAlpha: 100,
                lineWidth: 2,
                valueTextSize: 14,
                valueTextColor: processColor('white'),
              }
            }, {
              values: [{ value: 115 }, { value: 100 }, { value: 105 }, { value: 110 }, { value: 120 }],
              label: 'DS 2',
              config: {
                color: processColor('pink'),
                drawFilled: true,
                fillColor: processColor('pink'),
                fillAlpha: 150,
                lineWidth: 1.5,
                valueTextSize: 14,
                valueTextColor: processColor('white'),
              }
            }, {
              values: [{ value: 105 }, { value: 115 }, { value: 121 }, { value: 110 }, { value: 105 }],
              label: 'DS 3',
              config: {
                color: processColor('#ff0000'),
                drawFilled: true,
                fillColor: processColor('#ff0000'),
                valueTextSize: 14,
                valueTextColor: processColor('white'),
              }
            }],
          }
        },
        xAxis: {

          $set: {
            valueFormatter: ['A', 'B', 'C', 'D', 'E'],
            textSize: 12,
            textColor: processColor('darkgray'),

          }
        },
      })
    );
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
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/radar-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={{ drawLabels: false }}
            chartDescription={{ text: 'Radar Chart' }}
            legend={this.state.legend}
            drawWeb={true}

            webLineWidth={5}
            webLineWidthInner={5}
            webAlpha={255}
            webColor={processColor("#ccc")}
            webColorInner={processColor("#ccc")}
            chartDescription={{ text: '' }}
            skipWebLineCount={1}
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


export default RadarChartScreen;
