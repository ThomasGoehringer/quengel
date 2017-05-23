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

export default class HeadCircumferenceAnalysisScreen extends Component {
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
    this.setState({ data: this.props.screenProps.headCircumference });

    const gender = this.props.screenProps.gender;
    const lastElement = this.props.screenProps.headCircumference[this.props.screenProps.headCircumference.length - 1].x;
    const headCircumferenceData = gender === 'male' ? HEADCIRCUMFERENCE.MALE : HEADCIRCUMFERENCE.FEMALE;
    if (lastElement < 36) {
      const defaultData = headCircumferenceData.filter(d => d.x < lastElement + 2);
      this.setState({ defaultData });
    } else {
      this.setState({ defaultData: headCircumferenceData });
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
        <Text>Height Statistics</Text>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              onTouchStart={() => this.setState({ scrollEnabled: false })}
              onTouchEnd={() => this.setState({ scrollEnabled: false })}
            />
          }
        >
          <VictoryArea
            data={this.state.defaultData}
            style={chartStyles.area}
          />
          <VictoryAxis
            style={chartStyles.xAxis}
            tickCount={10}
            tickValues={this.getTickValues()}
          />
          <VictoryAxis
            dependentAxis
            style={chartStyles.yAxis}
            tickCount={10}
          />
          <VictoryGroup
            data={this.state.data}
            y={d => (d.y)}
          >
            <VictoryLine
              style={chartStyles.line}
            />
            <VictoryScatter
              size={3}
              style={chartStyles.scatter}
            />
          </VictoryGroup>
        </VictoryChart>
        <Table data={this.state.data} />
      </ScrollView>
    );
  }
}
