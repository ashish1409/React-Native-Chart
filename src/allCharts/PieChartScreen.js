import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ImageBackground
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { Thumbnail } from 'native-base';
import { PieChart } from 'react-native-charts-wrapper';

class PieChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Pie Chart',
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
        textColor: processColor('darkgray'),
        horizontalAlignment: "RIGHT",
        verticalAlignment: "TOP",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{ value: 45, label: 'Sandwiches' },
          { value: 21, label: 'Salads' },
          { value: 15, label: 'Soup' },
          { value: 9, label: 'Beverages' },
          { value: 15, label: 'Desserts' }],
          label: '',
          config: {
            colors: [processColor('#df645c'), processColor('#730068'), processColor('#042f4b'), processColor('#239f95'), processColor('#3c70a4')],
            valueTextSize: 14,
            valueTextColor: processColor('#f2f2f2'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('#f2f2f2'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      highlights: [{ x: 2 }],
      description: {
        text: '',
        textSize: 14,
        textColor: processColor('darkgray'),
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
            <Text style={styles.eventThumb}>  <Thumbnail square source={require('../../assets/pai-chart.png')} /></Text>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.description}>Select:</Text>
            <Text style={styles.userData}>{this.state.selectedEntry}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('transparent')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}

            entryLabelColor={processColor('#f2f2f2')}
            entryLabelTextSize={14}
            drawEntryLabels={true}

            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{ text: 'Pie Chart!', color: processColor('#f2f2f2'), size: 20 }}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#232d38')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={350}
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
    color: "#f2f2f2",
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
    color: "#f2f2f2",
  },

  userData: {
    fontSize: 14,
    color: "#f2f2f2",
  },
});

export default PieChartScreen;

