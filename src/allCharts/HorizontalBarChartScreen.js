import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
class HorizontalBarChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Horizontal Bar Chart',
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
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        textColor: processColor('darkgray'),

      },
      data: {
        dataSets: [{
          values: [{ y: 100 }, { y: 105 }, { y: 102 }, { y: 110 }, { y: 114 }, { y: 109 }, { y: 105 }, { y: 99 }, { y: 95 }],
          label: 'Bar dataSet',
          config: {
            color: processColor('#df645c'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('#a9b0bb'),
            valueTextColor: processColor('#a9b0bb'),
            valueTextSize: 14,
          }
        }],
        config: {
          barWidth: 0.5,
        },
      },
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        position: 'BOTTOM',
        granularityEnabled: true,
        granularity: 1,
        labelCount: 10,
        textSize: 14,
        textColor: processColor('#a9b0bb'),
      },
      yAxis: {
        left: {
          axisMinimum: 0,
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        },
        right: {
          axisMinimum: 0,
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        }
      }
    };
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
            <Text style={styles.eventThumb}>  <Thumbnail square smallsource={require('../../assets/h-bar-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <HorizontalBarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            animation={{ durationX: 2000 }}
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
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

export default HorizontalBarChartScreen;
