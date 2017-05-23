import React, { Component } from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import WeightAnalysisScreen from './WeightAnalysisScreen';
import HeightAnalysisScreen from './HeightAnalysisScreen';
import DiapersAnalysisScreen from './DiapersAnalysisScreen';
import HeadCircumferenceAnalysisScreen from './HeadCircumferenceAnalysisScreen';
import { COLOR } from '../../config/globals';
import { getCharts } from '../../services/databaseService';
import { getData } from '../../services/storageService';
import { transformCharts } from '../../services/helperService';


export default class AnalysisScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    getData('user').then((user) => {
      getCharts(user.jwt).then((charts) => {
        const gender = { gender: user.gender };
        const chartData = transformCharts(user, charts);
        this.setState({ data: Object.assign(chartData, gender) });
      });
    });
  }

  render() {
    if (!this.state.data) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#6d9eac" />
        <AnalysisNavigator screenProps={this.state.data} />
      </View>
    );
  }
}


const AnalysisNavigator = TabNavigator({
  WeightAnalysis: { screen: WeightAnalysisScreen },
  HeightAnalysis: { screen: HeightAnalysisScreen },
  HeadCircumferenceAnalysis: { screen: HeadCircumferenceAnalysisScreen },
  DiapersAnalysis: { screen: DiapersAnalysisScreen }
}, {
  tabBarOptions: {
    activeTintColor: COLOR.SECONDARY,
    inactiveTintColor: COLOR.SECONDARY,
    scrollEnabled: true,
    lazy: false,
    style: {
      backgroundColor: '#FFFFFF'
    },
    indicatorStyle: {
      backgroundColor: COLOR.SECONDARY
    }
  }
});
