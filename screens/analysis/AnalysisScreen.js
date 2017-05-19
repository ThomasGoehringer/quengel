import { TabNavigator } from 'react-navigation';
import WeightAnalysisScreen from './WeightAnalysisScreen';
import HeightAnalysisScreen from './HeightAnalysisScreen';
import DiapersAnalysisScreen from './DiapersAnalysisScreen';
import HeadCircumferenceAnalysisScreen from './HeadCircumferenceAnalysisScreen';
import { COLOR } from '../../config/globals';


const AnalysisScreen = TabNavigator({
  WeightAnalysis: { screen: WeightAnalysisScreen },
  DiapersAnalysis: { screen: DiapersAnalysisScreen },
  HeadCircumferenceAnalysis: { screen: HeadCircumferenceAnalysisScreen },
  HeightAnalysis: { screen: HeightAnalysisScreen }
}, {
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: COLOR.SECONDARY,
    scrollEnabled: true,
    lazy: false,
    style: {
      backgroundColor: COLOR.PRIMARY
    },
    indicatorStyle: {
      backgroundColor: '#FFFFFF'
    }
  }
});


export default AnalysisScreen;
