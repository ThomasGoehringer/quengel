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
  VictoryArea
} from 'victory-native';

export default class StatisticScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <ScrollView>
        <Text>Screen Statistics</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryArea theme={VictoryTheme.material}
            data={[
              { month: 'September', profit: 35000, loss: 2000 },
              { month: 'October', profit: 42000, loss: 8000 },
              { month: 'November', profit: 55000, loss: 5000 }
            ]}
            x="month"
            y={datum => datum.profit - datum.loss}
          />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine theme={VictoryTheme.material}
            data={[
              {month: "September", profit: 35000, loss: 2000},
              {month: "October", profit: 42000, loss: 8000},
              {month: "November", profit: 55000, loss: 5000}
            ]}
            x="month"
            y={(datum) => datum.profit - datum.loss}
          />
        </VictoryChart>
      </ScrollView>
    );
  }
}
