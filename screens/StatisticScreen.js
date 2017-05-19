import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import {
  Text
} from 'native-base';
import {
  VictoryTheme,
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryGroup,
  VictoryBar,
  VictoryScatter
} from 'victory-native';

export default class StatisticScreen extends Component {
  componentDidMount() {

  }

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
        <Text>Screen Statistics</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryGroup
            data={data}
            y={(d) => (d.lineY)}
          >
            <VictoryLine style={{ data: { stroke: "red" } }}/>
            <VictoryScatter
              size={3}
              style={{ data: { stroke: "navy", fill: "white", strokeWidth: 2 } }}
            />
          </VictoryGroup>
          <VictoryArea
             data={data}
             style={{ data: { fill: "navy", opacity: 0.4 } }}
           />
        </VictoryChart>
      </ScrollView>
    );
  }
}
