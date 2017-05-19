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
  VictoryAxis
} from 'victory-native';
import { theme } from '../../config/chartTheme';
import { COLOR } from '../../config/globals';


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

export default class WeightAnalysisScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Gewicht'
  };

  render() {
    const data = [
      {lineY: 4, x: 1, y: 4.2, _y0: 2.5},
      {lineY: 4.3, x: 2, y: 5.4, _y0: 3.2},
      {lineY: 6, x: 3, y: 7.4, _y0: 4.4},
      {lineY: 7.1, x: 4, y: 9.5, _y0: 6.2},
      {lineY: 10.1, x: 5, y: 10.9, _y0: 7.5},
      {lineY: 11.9, x: 6, y: 12.0, _y0: 8.4},
      {lineY: 12.0, x: 7, y: 13.4, _y0: 9.6},
      {lineY: 13.0, x: 8, y: 14.7, _y0: 10.5},
      {lineY: 14.0, x: 9, y: 15.2, _y0: 12.2},
      {lineY: 15.0, x: 10, y: 19.5, _y0: 14.5}
    ];

    return (
      <ScrollView>
        <Text>Weight Statistics</Text>
        <VictoryChart>
          <VictoryArea
            data={data}
            style={chartStyles.area}
          />
          <VictoryAxis
            style={chartStyles.xAxis}
            tickCount={10}
          />
          <VictoryAxis
            dependentAxis
            style={chartStyles.yAxis}
            tickCount={10}
          />
          <VictoryGroup
            data={data}
            y={(d) => (d.lineY)}
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
      </ScrollView>
    );
  }
}
