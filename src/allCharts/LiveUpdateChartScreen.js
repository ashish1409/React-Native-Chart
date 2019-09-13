import React, { Component } from 'react';
import { StyleSheet, processColor } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import { LineChart } from 'react-native-charts-wrapper';

const colors = [processColor('#8562b4'), processColor('#dc433f'), processColor('#aad34f'), processColor('#f2f2f2'), processColor('purple'), processColor('#f7a900')];



export default class LiveUpdating extends Component {

  static navigationOptions = {
    title: 'Live Updating Chart',
    headerStyle: {
      backgroundColor: '#df645c',
    },
    headerTintColor: '#f2f2f2',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  static displayName = 'LiveUpdating';

  constructor(props) {
    super(props);
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
      values: [0],
      colorIndex: 0,
      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('#8562b4'),
        markerColor: processColor('#dc433f'),
        textColor: processColor('#f2f2f2'),
      }
    }
  }

  next(values, colorIndex) {
    return {
      data: {
        dataSets: [{
          values: values,
          label: 'Sine function',

          config: {
            drawValues: false,
            color: colors[colorIndex],
            mode: "CUBIC_BEZIER",
            drawCircles: false,
            lineWidth: 2
          }
        }]
      },
      xAxis: {
        axisLineWidth: 0,
        drawLabels: false,
        position: 'BOTTOM',
        drawGridLines: false,
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
    }

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.values.length >= 10) {
        // https://github.com/PhilJay/MPAndroidChart/issues/2450
        // MpAndroidChart 3.0.2 will crash when data entry list is empty.

        this.refs.chart.highlights([])
        this.setState({ values: [0], colorIndex: 0 });
      } else {
        this.setState({
          values: this.state.values.concat([Math.floor((Math.random() * 100) + 1)]),
          colorIndex: (this.state.colorIndex + 1) % colors.length
        });
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { values, colorIndex } = this.state;
    const config = this.next(values, colorIndex);
    return (

      <SafeAreaView style={styles.SafeAreaView}>
        <LineChart data={config.data} xAxis={config.xAxis} yAxis={config.yAxis} style={styles.container} marker={this.state.marker} ref="chart" chartDescription={{ text: '' }} legend={this.state.legend} />
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
