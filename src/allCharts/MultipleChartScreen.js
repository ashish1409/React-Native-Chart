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
const CustomColor1 = "rgb(223, 100, 92)";
class MultipleChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Multiple Chart',
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
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 25,
        formToTextSpace: 5,
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

      },
      chart1Zoom: { scaleX: 3, scaleY: 1, xValue: 50, yValue: 0, },
      chart2Zoom: { scaleX: 5, scaleY: 1, xValue: 50, yValue: 0, },


    }
  }

  componentDidMount() {

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: Array.from(new Array(600), (val, index) => index),
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
              values: Array.from(new Array(600), (val, index) => index + 5),
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
          }
        }
      })
    );
  }

  syncToChart2(event) {
    if (event.action == 'chartScaled' || event.action == 'chartTranslated') {
      let { scaleX, scaleY, centerX, centerY } = event
      this.setState({ ...this.state, chart2Zoom: { scaleX: scaleX, scaleY: scaleY, xValue: centerX, yValue: centerY } })
      console.log("sync chart2" +
        " to " + centerX + " " + centerY)
    }

    console.log(event)
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
            zoom={this.state.chart1Zoom}

            ref="chart1"

            onChange={(event) => this.syncToChart2(event.nativeEvent)}
          />
        </View>

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

            ref="chart2"

            zoom={this.state.chart2Zoom}
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


export default MultipleChartScreen;
