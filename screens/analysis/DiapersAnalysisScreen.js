import React, { Component } from 'react';
import {
  Text,
  ScrollView
} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryGroup,
  VictoryScatter,
  VictoryAxis,
  VictoryContainer
} from 'victory-native';
import Table from '../../components/Table';
import { COLOR } from '../../config/globals';
import { HEADCIRCUMFERENCE } from '../../config/defaultData';


const chartStyles = {
  xAxis: {
    axis: {
      fill: 'transparent',
      stroke: COLOR.SECONDARY,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }
  },
  yAxis: {
    axis: {
      fill: 'transparent',
      stroke: COLOR.SECONDARY,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
    grid: {
      fill: COLOR.PRIMARY,
      stroke: COLOR.PRIMARY,
      opacity: 0.7
    }
  },
  area: {
    data: {
      fill: COLOR.LAVENDEL,
      opacity: 0.5
    }
  },
  line: {
    data: {
      stroke: COLOR.SECONDARY,
      strokeWidth: 2
    }
  },
  scatter: {
    data: {
      fill: COLOR.SECONDARY
    }
  }
};

export default class DiapersAnalysisScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Kopfumfang'
  };

  constructor() {
    super();
    this.state = {
      data: [],
      defaultData: [],
      scrollEnabled: false
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.screenProps.weight });

    const gender = this.props.screenProps.gender;
    let lastElement = 0;
    if (this.props.screenProps.weight.length >= 2) {
      lastElement = this.props.screenProps.weight[this.props.screenProps.weight.length - 1].x;
    }
    const weightData = gender === 'male' ? HEADCIRCUMFERENCE.MALE : HEADCIRCUMFERENCE.FEMALE;
    if (lastElement < 36) {
      const defaultData = weightData.filter(d => d.x < lastElement + 2);
      this.setState({ defaultData });
    } else {
      this.setState({ defaultData: weightData });
    }
  }

  getTickValues() {
    return this.state.defaultData.reduce((acc, val) => {
      acc.push(val.x);
      return acc;
    }, []);
  }

  render() {
    return (
      <ScrollView>
        <Text>Diapers Statistics</Text>
      </ScrollView>
    );
  }
}
