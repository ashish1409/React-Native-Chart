import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
class StackedBarChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Stack Bar Chart',
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
          values: [{ y: [40, 30, 20], marker: ["row1", "row2", "row3"] }, { y: [10, 20, 10], marker: "second" }, { y: [30, 20, 50], marker: ["hello", "world", "third"] }, { y: [30, 50, 10], marker: "fourth" }],
          label: 'Stacked Bar dataset',
          config: {
            colors: [processColor('#8562b4'), processColor('#dc433f'), processColor('#aad34f')],
            stackLabels: ['Engineering', 'Sales', 'Marketing'],
            valueTextColor: processColor('#fff'),
            valueTextSize: 14,
          }
        }],
      },
      highlights: [{ x: 1, stackIndex: 2 }, { x: 2, stackIndex: 1 }],
      xAxis: {
        valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4'],
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
            <Text style={styles.eventThumb}>  <Thumbnail square smallsource={require('../../assets/stack-chart.png')} /></Text>
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
            marker={{
              enabled: true,
              markerColor: processColor('#272934'),
              textColor: processColor('white'),
              markerFontSize: 14,
            }}
            highlights={this.state.highlights}
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


export default StackedBarChartScreen;
