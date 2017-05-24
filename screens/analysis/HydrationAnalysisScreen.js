import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl
} from 'react-native';
import Table from '../../components/Table';
import { COLOR, FONTSIZE } from '../../config/globals';
import { getCharts } from '../../services/databaseService';
import { getData } from '../../services/storageService';
import { transformCharts } from '../../services/helperService';


const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    backgroundColor: 'rgba(111, 168, 221, 0.7)'
  },
  column: {
    flex: 1
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: FONTSIZE.CAPTION,
    color: COLOR.WHITE
  },
  number: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: FONTSIZE.DISPLAY2,
    color: COLOR.WHITE
  }
});

export default class HydrationAnalysisScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Fläschchen'
  };

  constructor() {
    super();
    this.state = {
      data: [],
      tableData: []
    };
  }

  componentWillMount() {
    this.setState({
      data: this.props.screenProps.hydration,
      tableData: this.props.screenProps.hydration.reverse()
    });
  }

  updateCharts() {
    getData('user').then((user) => {
      getCharts(user.jwt).then((charts) => {
        const gender = { gender: user.gender };
        const chartData = transformCharts(user, charts);
        const mergedData = Object.assign(chartData.hydration, gender);
        this.setState({ data: mergedData, tableData: mergedData.reverse() });
      });
    });
  }

  getMin() {
    return this.state.data.reduce((acc, val) => {
      return acc < val.y ? acc : val.y;
    }, 1000);
  }

  getMax() {
    return this.state.data.reduce((acc, val) => {
      return acc > val.y ? acc : val.y;
    }, 0);
  }

  getAverage() {
    const sum = this.state.data.reduce((acc, val) => {
      return acc + val.y;
    }, 0);
    const average = sum / this.state.data.length;
    return Math.round(average * 100) / 100;
  }

  render() {
    if (this.state.data.length === 0) {
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
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>DURCHSCHNITT</Text>
            <Text style={styles.number}>{this.getAverage()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>MIN</Text>
            <Text style={styles.number}>{this.getMin()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>MAX</Text>
            <Text style={styles.number}>{this.getMax()}</Text>
          </View>
        </View>
        <Table data={this.state.data} />
      </ScrollView>
    );
  }
}
