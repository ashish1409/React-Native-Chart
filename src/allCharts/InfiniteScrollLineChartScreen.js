import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';

import { LineChart } from 'react-native-charts-wrapper';

const distanceToLoadMore = 10
const pageSize = 100

class InfiniteScrollLineChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Infinite Scroll LineChart',
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

    this.isLoading = false
    this.xMin = 0
    this.xMax = 0


    this.state = {
      data: {},
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
        textSize: 14,
        textColor: processColor('#a9b0bb'),
      },

      yAxis: {
        left: {
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        },
        right: {
          textSize: 14,
          textColor: processColor('#a9b0bb'),
        }
      },
    };
  }

  componentDidMount() {
    let _this = this
    this.mockLoadDataFromServer(-pageSize, pageSize).then(function (data) {
      _this.setState(
        {
          data: data,
          visibleRange: { x: { min: 25, max: 50 } }
        })
    })
  }

  mockLoadDataFromServer(from, to) {
    let _this = this
    return new Promise(function (resolve) {
      setTimeout(function () {
        _this.xMin = from
        _this.xMax = to

        console.log("load data from " + from + " to " + to)
        resolve({
          dataSets: [{
            values: Array.from(new Array(parseInt(to - from)), (val, index) => ({
              x: from + index,
              y: Math.sin(0.1 * (from + index))
            })), label: 'sin', config: {
              color: processColor('#8562b4'), drawCircles: false, valueTextColor: processColor('#a9b0bb'),
              valueTextSize: 14,
            }
          }, {
            values: Array.from(new Array(parseInt(to - from)), (val, index) => ({
              x: from + index,
              y: Math.cos(0.1 * (from + index))
            })), label: 'cos', config: {
              color: processColor('#dc433f'), drawCircles: false, valueTextColor: processColor('#a9b0bb'),
              valueTextSize: 14,
            }
          }],
        })
      }, 50);
    })
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


  handleChange(event) {
    let nativeEvent = event.nativeEvent
    let _this = this


    if (nativeEvent.action == 'chartTranslated') {
      let { left, right, centerX } = nativeEvent

      console.log("data is from " + _this.xMin + " to " + _this.xMax + " left " + left + " right " + right + " isLoading " + _this.isLoading)
      if (!_this.isLoading) {

        if (_this.xMin > left - distanceToLoadMore || right + distanceToLoadMore > _this.xMax) {

          _this.isLoading = true
          _this.mockLoadDataFromServer(centerX - pageSize, centerX + pageSize).then(function (data) {

            _this.refs.chart.setDataAndLockIndex(data)

            _this.isLoading = false

          })
        }
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>

        <View style={styles.eventBox}>
          <View style={styles.eventBlock}>
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/infinite-chart.png')} /></Text>
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
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={this.state.legend}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            ref="chart"
            onChange={this.handleChange.bind(this)}
            onSelect={this.handleSelect.bind(this)}
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


export default InfiniteScrollLineChartScreen;
