import { TabNavigator } from 'react-navigation';
import WeightAnalysisScreen from './WeightAnalysisScreen';
import HeightAnalysisScreen from './HeightAnalysisScreen';
import DiapersAnalysisScreen from './DiapersAnalysisScreen';
import HeadCircumferenceAnalysisScreen from './HeadCircumferenceAnalysisScreen';


const AnalysisScreen = TabNavigator({
  WeightAnalysis: { screen: WeightAnalysisScreen },
  DiapersAnalysis: { screen: DiapersAnalysisScreen },
  HeadCircumferenceAnalysis: { screen: HeadCircumferenceAnalysisScreen },
  HeightAnalysis: { screen: HeightAnalysisScreen }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    scrollEnabled: true
  }
});


export default AnalysisScreen;
