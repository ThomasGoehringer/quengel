import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import Table from '../../components/Table';
import { COLOR, FONTSIZE } from '../../config/globals';


const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    backgroundColor: 'rgba(194, 123, 160, 0.7)'
  },
  column: {
    flex: 1
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: FONTSIZE.CAPTION,
    color: COLOR.WHITE
  },
  number: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: FONTSIZE.DISPLAY2,
    color: COLOR.WHITE
  }
});

const chartStyles = {
  xAxis: {
    axis: {
      fill: 'transparent',
      stroke: COLOR.DARKGRAY,
      strokeWidth: 1,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
    tickLabels: {
      fill: COLOR.TEXT,
      fontSize: FONTSIZE.CAPTION
    },
    axisLabel: {
      padding: 30,
      fontSize: FONTSIZE.CAPTION,
      fill: COLOR.TEXT
    }
  },
  yAxis: {
    axis: {
      fill: 'transparent',
      stroke: null,
      strokeWidth: 0,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
    grid: {
      stroke: COLOR.DARKGRAY,
      opacity: 0.1
    },
    tickLabels: {
      fill: COLOR.TEXT,
      fontSize: FONTSIZE.CAPTION
    }
  }
};

export default class DiapersAnalysisScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Windeln'
  };

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.screenProps.diapers });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>DURCHSCHNITT</Text>
            <Text style={styles.number}>10123</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
          <Text style={styles.text}>MIN</Text>
          <Text style={styles.number}>8023</Text>
          </View>
          <View style={styles.column}>
          <Text style={styles.text}>MAX</Text>
          <Text style={styles.number}>14023</Text>
          </View>
        </View>
        <Table data={this.state.data} />
      </ScrollView>
    );
  }
}
