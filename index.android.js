import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Image
} from 'react-native';
import {
  Button,
  Icon
} from 'native-base';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFN from 'react-native-vector-icons/Foundation';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import moment from 'moment';
import 'moment/locale/de';
import { COLOR } from './config/globals';
import EntryScreen from './screens/EntryScreen';
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import MilestoneEntryScreen from './screens/MilestoneEntryScreen';
import CommunityScreen from './screens/CommunityScreen';
import AnalysisScreen from './screens/analysis/AnalysisScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import CameraScreen from './screens/CameraScreen';
import QuestionScreen from './screens/QuestionScreen';
import { getData } from './services/storageService';
import { notificationsEnabled, scheduleNotification } from './services/notificationService';
import logo from './assets/images/logo.png';
import IconCM from './assets/icons/feet.png';

moment.locale('de');

const styles = StyleSheet.create({
  logo: {
    marginLeft: 15,
    justifyContent: 'center',
    width: 60,
    height: 60
  }
});


class Quenqel extends Component {
  constructor() {
    super();
    this.state = {
      onboarding: false
    };
  }

  componentWillMount() {
    getData('user').then((data) => {
      if (!data) {
        this.setState({ onboarding: true });
      }
    });

    // Schedule Notifications for the next 7 days if not disabled
    notificationsEnabled().then((enabled) => {
      if (enabled) {
        const title = 'Heute schon alles erfasst?';
        const message = 'Erfasse schnell die wichtigsten Angaben über deinen Tag und halte deine Auswertungen aktuell';

        // scheduleNotification(title, message, moment().day(0));
        // scheduleNotification(title, message, moment().day(1));
        // scheduleNotification(title, message, moment().day(2));
        // scheduleNotification(title, message, moment().day(3));
        // scheduleNotification(title, message, moment().day(4));
        // scheduleNotification(title, message, moment().day(5));
        // scheduleNotification(title, message, moment().day(6));
      }
    });
  }

  render() {
    if (this.state.onboarding) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#6d9eac" />
          <OnboardingNavigator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#6d9eac" />
        <MainNavigator />
      </View>
    );
  }
}


const BottomBarNavigator = TabNavigator({
  Log: { screen: LogScreen },
  Milestone: { screen: MilestoneScreen },
  Community: { screen: CommunityScreen },
  Analysis: { screen: AnalysisScreen }
}, {
  backBehavior: 'none',
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: COLOR.SECONDARY,
      activeLabelColor: '#FFFFFF',
      backgroundColor: COLOR.PRIMARY,
      rippleColor: '#FFFFFF',
      style: { borderTopWidth: 0, elevation: 8 },
      innerStyle: { marginBottom: -15 },
      shifting: false,
      tabs: {
        Log: {
          label: ' ',
          icon: <IconMC size={25} style={{ color: COLOR.SECONDARY }} name="calendar-today" />,
          activeIcon: <IconMC size={25} style={{ color: '#FFFFFF' }} name="calendar-today" />
        },
        Milestone: {
          label: ' ',
          icon: <IconFN size={25} style={{ color: COLOR.SECONDARY }} name="star" />,
          activeIcon: <IconFN size={25} style={{ color: '#FFFFFF' }} name="star" />
        },
        Community: {
          label: ' ',
          icon: <IconFN size={25} style={{ color: COLOR.SECONDARY }} name="torsos-all-female" />,
          activeIcon: <IconFN size={25} style={{ color: '#FFFFFF' }} name="torsos-all-female" />
        },
        Analysis: {
          label: ' ',
          icon: <IconFN size={25} style={{ color: COLOR.SECONDARY }} name="graph-bar" />,
          activeIcon: <IconFN size={25} style={{ color: '#FFFFFF' }} name="graph-bar" />
        }
      }
    }
  }
});

const OnboardingNavigator = StackNavigator({
  Onboarding: { screen: OnboardingScreen },
  Register: { screen: RegisterScreen },
  CreateProfile: { screen: CreateProfileScreen },
  Login: { screen: LoginScreen },
  Main: { screen: BottomBarNavigator },
  Profile: { screen: ProfileScreen },
  Entry: { screen: EntryScreen },
  Camera: { screen: CameraScreen },
  MilestoneEntry: { screen: MilestoneEntryScreen },
  Question: { screen: QuestionScreen }
}, {
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: COLOR.PRIMARY
    },
    headerTintColor: '#FFFFFF',
    headerTitle: <Image source={logo} style={styles.logo} />,
    headerRight: (
      <Button
        transparent
        person
        style={{ marginRight: 5 }}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon
          style={{ color: '#fff' }}
          name="person"
        />
      </Button>
    )
  })
});

const MainNavigator = StackNavigator({
  Main: { screen: BottomBarNavigator },
  Register: { screen: RegisterScreen },
  CreateProfile: { screen: CreateProfileScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  Entry: { screen: EntryScreen },
  Camera: { screen: CameraScreen },
  MilestoneEntry: { screen: MilestoneEntryScreen },
  Question: { screen: QuestionScreen }
}, {
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: COLOR.PRIMARY
    },
    headerTintColor: '#FFFFFF',
    headerRight: (
      <Button
        transparent
        person
        style={{ marginRight: 5 }}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon
          style={{ color: '#fff' }}
          name="person"
        />
      </Button>
    )
  })
});

AppRegistry.registerComponent('BabyApp', () => Quenqel);
