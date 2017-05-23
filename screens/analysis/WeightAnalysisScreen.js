import React, { Component } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator
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
import { WEIGHT } from '../../config/defaultData';
import { getData } from '../../services/storageService';


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

  constructor() {
    super();
    this.state = {
      data: [],
      defaultData: [],
      scrollEnabled: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      getData('chartData').then((data) => {
        if (!data) return;

        this.setState({ data: data.weight });

        const lastElement = data.weight[data.weight.length - 1].x;
        getData('user').then((user) => {
          const weightData = user.gender === 'male' ? WEIGHT.MALE : WEIGHT.FEMALE;
          if (lastElement < 36) {
            const defaultData = weightData.filter(d => d.x < lastElement + 6);
            this.setState({ defaultData });
          } else {
            this.setState({ defaultData: weightData });
          }
        });
      });
    }, 800);
  }

  getTickValues() {
    return this.state.defaultData.reduce((acc, val) => {
      acc.push(val.x);
      return acc;
    }, []);
  }

  render() {
    if (this.state.data.length === 0 || this.state.defaultData.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
        </View>
      );
    }

    return (
      <ScrollView>
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
