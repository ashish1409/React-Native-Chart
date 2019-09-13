/**
 * Created by xudong on 02/03/2017.
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, processColor } from 'react-native';

import { CombinedChart } from 'react-native-charts-wrapper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';

export default class Combined extends Component {
  static navigationOptions = {
    title: 'Combined Chart',
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
        verticalAlignment: "BOTTOM",
        orientation: "HORIZONTAL",
        textColor: processColor('darkgray'),
      },
      xAxis: {
        valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        granularityEnabled: true,
        granularity: 1,
        textSize: 14,
        textColor: processColor('#a9b0bb'),
      },

      yAxis: {
        left: {
          granularityEnabled: true,
          granularity: 10,
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        },
        right: {
          granularityEnabled: true,
          granularity: 100,
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

      data: {
        barData: {
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
        lineData: {
          dataSets: [{
            values: [50, 100, 50, 100, 50],
            label: 'Sine function',

            config: {
              drawValues: false,
              colors: [processColor('#f2f2f2')],
              mode: "CUBIC_BEZIER",
              drawCircles: false,
              lineWidth: 2,
              axisDependency: "RIGHT",
            }
          }, {
            values: [100, 50, 100, 50, 100],
            label: 'Cosine function',

            config: {
              drawValues: false,
              colors: [processColor('#df645c')],
              mode: "CUBIC_BEZIER",
              drawCircles: false,
              lineWidth: 2,
            }
          }],
        },
        bubbleData: {
          dataSets: [{
            values: [{
              size: 2.3,
              y: 180,
              marker: "marker 1"
            }, {
              size: 1.4,
              y: 150,
              marker: "marker 2"
            }, {
              size: 2.0,
              y: 106,
              marker: "marker 3"
            }, {
              size: 5.0,
              y: 100
            }, {
              size: 4.1,
              y: 65
            }],
            label: 'Company A',
            config: {
              drawValues: false,
              colors: [processColor('pink')],
              axisDependency: "RIGHT",
            }
          }],
        },
        candleData: {
          dataSets: [{
            values: [{
              shadowH: 20,
              shadowL: 5,
              open: 15,
              close: 10,
              marker: "marker 1"
            }, {
              shadowH: 30,
              shadowL: 10,
              open: 25,
              close: 15,
              marker: "marker 1"
            }, {
              shadowH: 10,
              shadowL: 5,
              open: 15,
              close: 10,
              marker: "marker 1"
            }, {
              shadowH: 50,
              shadowL: 5,
              open: 15,
              close: 25
            }],
            label: 'Company A',

            config: {
              drawValues: false,
              axisDependency: "RIGHT",
              highlightColor: processColor('darkgray'),

              shadowColor: processColor('black'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('yellow'),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor('green')
            }
          }],
        },
        scatterData: {
          dataSets: [{
            values: [15, 40, 77, 81, 43],
            label: 'Company A',

            config: {
              colors: [processColor('purple')],
              drawValues: false,
              scatterShape: 'SQUARE',
              decreasingColor: processColor('green')
            }

          }, {
            values: [40, 5, 50, 23, 79],
            label: 'Company B',

            config: {
              drawValues: false,
              colors: [processColor('grey')],
              scatterShape: 'CIRCLE',
              decreasingColor: processColor('green')
            }
          }, {
            values: [10, 55, 35, 90, 82],
            label: 'Company C',

            config: {
              drawValues: false,
              axisDependency: "RIGHT",
              colors: [processColor('brown')],
              scatterShape: 'TRIANGLE',
              decreasingColor: processColor('green')
            }
          }],
        },
      }
    };

  }

  componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({ ...this.state, highlights: [{ x: 1, y: 150, dataIndex: 4 }, { x: 2, y: 106, dataIndex: 4 }] })
  }


  static displayName = 'Combined';

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
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/combined-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <CombinedChart
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={this.state.legend}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            marker={this.state.marker}
            highlights={this.state.highlights}
            highlightFullBarEnabled={false}
            drawOrder={['SCATTER', 'LINE', 'BAR']}
            style={styles.container}
            chartDescription={{ text: '' }}
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
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent'
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
