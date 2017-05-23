import React, { Component } from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import moment from 'moment';
import WeightAnalysisScreen from './WeightAnalysisScreen';
import HeightAnalysisScreen from './HeightAnalysisScreen';
import DiapersAnalysisScreen from './DiapersAnalysisScreen';
import HeadCircumferenceAnalysisScreen from './HeadCircumferenceAnalysisScreen';
import { COLOR } from '../../config/globals';
import { getData, setData } from '../../services/storageService';
import { getCharts } from '../../services/databaseService';
import { transformCharts } from '../../services/helperService';


export default class AnalysisScreen extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    getData('user').then((user) => {
      getCharts(user.jwt).then((charts) => {
        const chartData = transformCharts(user, charts);
        setData('chartData', chartData);
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#6d9eac" />
        <AnalysisNavigator />
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
