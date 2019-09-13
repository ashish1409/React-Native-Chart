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
import { TouchableOpacity } from 'react-native-gesture-handler';

class LineChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Line Chart',
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

      }
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [{ x: 4, y: 135 }, { x: 5, y: 0.88 }, { x: 6, y: 0.77 }, { x: 7, y: 105 }],
              label: 'A',
              config: {
                color: processColor('#a9b0bb'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              },
            },
            {
              values: [{ x: 4, y: 105 }, { x: 5, y: 90 }, { x: 6, y: 130 }, { x: 7, y: 100 }],
              label: 'B',
              config: {
                color: processColor('#a9b0bb'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              },
            },
            {
              values: [{ x: 4, y: 110 }, { x: 5, y: 110 }, { x: 6, y: 105 }, { x: 7, y: 115 }],
              label: 'C',
              config: {
                color: processColor('#a9b0bb'),
                highlightAlpha: 90,
                valueTextColor: processColor('#a9b0bb'),
                valueTextSize: 14,
              },
            }],
          }
        }
      })
    );


  }

  onPressLearnMore() {

    this.refs.chart.setDataAndLockIndex({
      dataSets: [{
        values: [
          { x: 1, y: 0.88 },
          { x: 2, y: 0.77 },
          { x: 3, y: 105 },
          { x: 4, y: 135 },
          { x: 5, y: 0.88 },
          { x: 6, y: 0.77 },
          { x: 7, y: 105 },
          { x: 8, y: 135 }
        ],
        label: 'A',
      }, {
        values: [
          { x: 1, y: 90 },
          { x: 2, y: 130 },
          { x: 3, y: 100 },
          { x: 4, y: 105 },
          { x: 5, y: 90 },
          { x: 6, y: 130 },
          { x: 7, y: 100 },
          { x: 8, y: 105 }
        ],
        label: 'B',
      }, {
        values: [
          { x: 1, y: 110 },
          { x: 2, y: 105 },
          { x: 3, y: 115 },
          { x: 4, y: 110 },
          { x: 5, y: 110 },
          { x: 6, y: 105 },
          { x: 7, y: 115 },
          { x: 8, y: 110 }],
        label: 'C',
      }],
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

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity onPress={this.onPressLearnMore.bind(this)}>
          <Text style={styles.loadData} >Press to load more</Text>
        </TouchableOpacity>


        <View style={styles.eventBox}>
          <View style={styles.eventBlock}>
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/line-chart.png')} /></Text>
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
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor('#df645c')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={true}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={true}
            visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={true}
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
  loadData: {
    color: '#df645c',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 8
  }
});

export default LineChartScreen;
