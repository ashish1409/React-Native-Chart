import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import { BarChart } from 'react-native-charts-wrapper';

class StackedBarChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Group Bar Chart',
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
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true,
        textColor: processColor('darkgray'),
      },
      data: {
        dataSets: [{
          values: [5, 40, 77, 81, 43],
          label: 'Company A',
          config: {
            drawValues: false,
            colors: [processColor('#8562b4')],
          }
        }, {
          values: [40, 5, 50, 23, 79],
          label: 'Company B',
          config: {
            drawValues: false,
            colors: [processColor('#dc433f')],
          }
        }, {
          values: [10, 55, 35, 90, 82],
          label: 'Company C',
          config: {
            drawValues: false,
            colors: [processColor('#aad34f')],
          }
        }],

        config: {
          barWidth: 0.2,
          group: {
            fromX: 0,
            groupSpace: 0.1,
            barSpace: 0.1,
          },
        }
      },
      xAxis: {
        valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true,
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
      },
      marker: {
        enabled: true,
        markerColor: processColor('#df645c'),
        textColor: processColor('#f2f2f2'),
        markerFontSize: 14,
      },

    };
  }

  componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({ ...this.state, highlights: [{ x: 1, y: 40 }, { x: 2, y: 50 }] })
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
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/group-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={{ text: '' }}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            highlights={this.state.highlights}
            marker={this.state.marker}
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


export default StackedBarChartScreen;
