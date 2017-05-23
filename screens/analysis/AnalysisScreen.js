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


export default class AnalysisScreen extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    getData('user').then((user) => {
      getCharts(user.jwt).then((charts) => {
        const weightBadges = charts.filter(badge => badge.badgeType === 'weight');
        const chartDataWeight = weightBadges.reduce((acc, weightBadge) => {
          const dateOfBirth = moment(user.dateOfBirth, 'DD.MM.YYYY').format();
          const dateDiff = moment(weightBadge.createdAt).diff(dateOfBirth, 'days') / 30;
          const data = {
            x: dateDiff,
            y: Number(weightBadge.value),
            unit: weightBadge.unit,
            createdAt: weightBadge.createdAt
          };

          acc.push(data);
          return acc;
        }, []);

        const chartData = {
          weight: chartDataWeight
        };

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
  DiapersAnalysis: { screen: DiapersAnalysisScreen },
  HeadCircumferenceAnalysis: { screen: HeadCircumferenceAnalysisScreen },
  HeightAnalysis: { screen: HeightAnalysisScreen }
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
