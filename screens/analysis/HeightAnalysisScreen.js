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


export default class HeightAnalysisScreen extends Component {
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
        <Text>Height Statistics</Text>
        <VictoryChart theme={theme}>
          <VictoryGroup
            data={data}
            y={(d) => (d.lineY)}
          >
            <VictoryLine />
            <VictoryScatter
              size={3}
            />
          </VictoryGroup>
          <VictoryArea
            data={data}
            theme={theme.area}
          />
        </VictoryChart>
      </ScrollView>
    );
  }
}
