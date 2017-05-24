import React, { Component } from 'react';
import {
  Text,
  ScrollView
} from 'react-native';
import Table from '../../components/Table';
import { COLOR, FONTSIZE } from '../../config/globals';


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
        <Table data={this.state.data} />
      </ScrollView>
    );
  }
}
