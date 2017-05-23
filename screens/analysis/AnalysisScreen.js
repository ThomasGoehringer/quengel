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
        const dateOfBirth = moment(user.dateOfBirth, 'DD.MM.YYYY').format();

        // Weight data
        const weightBadges = charts.filter(badge => badge.badgeType === 'weight');
        const chartDataWeight = weightBadges.reduce((acc, weightBadge) => {
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

        // Height data
        const heightBadges = charts.filter(badge => badge.badgeType === 'height');
        const chartDataHeight = heightBadges.reduce((acc, heightBadge) => {
          const dateDiff = moment(heightBadge.createdAt).diff(dateOfBirth, 'days') / 30;
          const data = {
            x: dateDiff,
            y: Number(heightBadge.value),
            unit: heightBadge.unit,
            createdAt: heightBadge.createdAt
          };

          acc.push(data);
          return acc;
        }, []);

        // Head circumference data
        const headCircumferenceBadges = charts.filter(badge => badge.badgeType === 'headCircumference');
        const chartDataHeadCircumference = headCircumferenceBadges.reduce((acc, headCircumferenceBadge) => {
          const dateDiff = moment(headCircumferenceBadge.createdAt).diff(dateOfBirth, 'days') / 30;
          const data = {
            x: dateDiff,
            y: Number(headCircumferenceBadge.value),
            unit: headCircumferenceBadge.unit,
            createdAt: headCircumferenceBadge.createdAt
          };

          acc.push(data);
          return acc;
        }, []);

        const chartData = {
          weight: chartDataWeight,
          height: chartDataHeight,
          headCircumference: chartDataHeadCircumference
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
