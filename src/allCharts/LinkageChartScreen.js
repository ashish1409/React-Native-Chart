import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor,
  TouchableOpacity
} from 'react-native';
import update from 'immutability-helper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import { LineChart } from 'react-native-charts-wrapper';

class LinkageChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Linkage Chart Screen',
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
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        textColor: processColor('darkgray'),
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

      },
      priceData: {
        dataSets: [{
          values: Array.from(new Array(600), (val, index) => index),
          label: 'price',
          valueTextColor: processColor('#a9b0bb'),
          valueTextSize: 14,
        }]
      },
      volumeData: {
        dataSets: [{
          values: Array.from(new Array(600), (val, index) => index),
          label: 'volume',
          valueTextColor: processColor('#a9b0bb'),
          valueTextSize: 14,
        }]
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity>
          <Text style={styles.loadData} >Drag or zoom first chart</Text>
        </TouchableOpacity>
        <View style={styles.container}>

          <LineChart
            style={styles.chart}
            data={this.state.priceData}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={this.state.legend}
            group="stock"
            identifier="price"
            syncX={true}
            syncY={true}
            chartDescription={{ text: '' }}
            visibleRange={{ x: { min: 1, max: 100 } }}
            dragDecelerationEnabled={false}
            doubleTapToZoomEnabled={false}  // it has to be false!!

          />
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.volumeData}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={this.state.legend}
            group="stock"
            identifier="volume"
            syncX={true}
            syncY={true}
            chartDescription={{ text: '' }}
            visibleRange={{ x: { min: 1, max: 100 } }}
            dragDecelerationEnabled={false}
            doubleTapToZoomEnabled={false}  // it has to be false!!
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
  loadData: {
    color: '#df645c',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 8
  }
});

export default LinkageChartScreen;
