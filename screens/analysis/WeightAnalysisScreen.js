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
  VictoryScatter
} from 'victory-native';
import { theme } from '../../config/chartTheme';
import { COLOR } from '../../config/globals';


const chartStyles = {
  area: {
    data: {
      fill: COLOR.LAVENDEL
    }
  }
};

export default class WeightAnalysisScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications'
  };

  render() {
    const data = [
      {lineY: 4, x: 1, y: 10, _y0: 3},
      {lineY: 4, x: 2, y: 5, _y0: 2},
      {lineY: 4, x: 3, y: 3, _y0: 1},
      {lineY: 4, x: 4, y: 5, _y0: 2},
      {lineY: 4, x: 5, y: 2, _y0: 1},
      {lineY: 4, x: 6, y: 4, _y0: 2},
      {lineY: 4, x: 7, y: 5, _y0: 2}
    ];

    return (
      <ScrollView>
        <Text>Weight Statistics</Text>
        <VictoryChart>
          <VictoryArea
            data={data}
            style={chartStyles.area}
          />
          <VictoryGroup
            data={data}
            y={(d) => (d.lineY)}
          >
            <VictoryLine />
            <VictoryScatter
              size={3}
            />
          </VictoryGroup>
        </VictoryChart>
      </ScrollView>
    );
  }
}
