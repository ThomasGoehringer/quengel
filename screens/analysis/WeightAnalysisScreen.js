import React, { Component } from 'react';
import {
  ScrollView,
  View,
  RefreshControl,
  Text
} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryContainer
} from 'victory-native';
import Table from '../../components/Table';
import { COLOR, FONTSIZE } from '../../config/globals';
import { WEIGHT } from '../../config/defaultData';
import { getCharts } from '../../services/databaseService';
import { getData } from '../../services/storageService';
import { transformCharts } from '../../services/helperService';


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
  },
  area: {
    data: {
      fill: COLOR.MEASUREMENT,
      opacity: 0.7
    }
  },
  line: {
    data: {
      stroke: COLOR.DARKGRAY,
      strokeWidth: 2
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
      tableData: [],
      defaultData: [],
      scrollEnabled: false
    };
  }

  componentWillMount() {
    this.setState({
      data: this.props.screenProps.weight,
      tableData: this.props.screenProps.weight.reverse()
    });

    const gender = this.props.screenProps.gender;
    let lastElement = 0;
    if (this.props.screenProps.weight.length >= 2) {
      lastElement = this.props.screenProps.weight[0].x;
    }
    const weightData = gender === 'male' ? WEIGHT.MALE : WEIGHT.FEMALE;
    if (lastElement < 36) {
      const defaultData = weightData.filter(d => d.x < lastElement + 6);
      this.setState({ defaultData });
    } else {
      this.setState({ defaultData: weightData });
    }
  }

  updateCharts() {
    getData('user').then((user) => {
      getCharts(user.jwt).then((charts) => {
        const gender = { gender: user.gender };
        const chartData = transformCharts(user, charts);
        const mergedData = Object.assign(chartData.weight, gender);
        this.setState({ data: mergedData, tableData: mergedData.reverse() });
      });
    });
  }

  getTickValues() {
    return this.state.defaultData.reduce((acc, val) => {
      acc.push(val.x);
      return acc;
    }, []);
  }

  render() {
    if (this.state.data.length < 2) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[COLOR.SECONDARY]}
              refreshing={false}
              onRefresh={() => this.updateCharts()}
            />
          }
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 190 }}>
            <Text>Nicht genügend Einträge vorhanden</Text>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[COLOR.SECONDARY]}
            refreshing={false}
            onRefresh={() => this.updateCharts()}
          />
        }
      >
        <VictoryChart
          padding={{ left: 60, top: 20, bottom: 65, right: 20 }}
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
            label="Monat"
            style={chartStyles.xAxis}
            tickCount={10}
            tickValues={this.getTickValues()}
          />
          <VictoryAxis
            offsetX={55}
            dependentAxis
            style={chartStyles.yAxis}
            tickCount={10}
          />
          <VictoryLine
            data={this.state.data}
            y={d => (d.y)}
            style={chartStyles.line}
            interpolation="cardinal"
          />
        </VictoryChart>
        <Table data={this.state.tableData} />
      </ScrollView>
    );
  }
}
