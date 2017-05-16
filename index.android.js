import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  StyleProvider,
  Footer,
  FooterTab,
  Button,
  Header,
  Left,
  Icon
} from 'native-base';
import { StackNavigator, NavigationActions } from 'react-navigation';
import moment from 'moment';
import getTheme from './config/native-base-theme/components';
import platform from './config/native-base-theme/variables/platform';
import EntryScreen from './screens/EntryScreen';
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import MilestoneEntryScreen from './screens/MilestoneEntryScreen';
import CommunityScreen from './screens/CommunityScreen';
import StatisticScreen from './screens/StatisticScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import CameraScreen from './screens/CameraScreen';
import { getData } from './services/storageService';
import { notificationsEnabled, scheduleNotification } from './services/notificationService';
import logo from './assets/images/logo.png';


const styles = StyleSheet.create({
  logo: {
    marginLeft: 5,
    width: 60,
    height: 60
  }
});

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.renderActiveScreen = this.renderActiveScreen.bind(this);
    this.state = {
      activeScreen: 'LogScreen'
    };
  }

  componentWillMount() {
    getData('user').then((data) => {
      if (!data) {
        // Reset the StackNavigator to RegisterScreen
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Onboarding' })
          ]
        });
        // NavigationActions.navigate({ routeName: 'Register' })
        this.props.navigation.dispatch(resetAction);
      } else if (!data.name) {
        // Does not have a profile yet, reset to CreateProfileScreen
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Onboarding' })

          ]
        });
        // NavigationActions.navigate({ routeName: 'CreateProfile' })
        this.props.navigation.dispatch(resetAction);
      }
    });

    // Schedule Notifications for the next 7 days if not disabled
    notificationsEnabled().then((enabled) => {
      if (enabled) {
        const title = 'Heute schon alles erfasst?';
        const message = 'Erfasse schnell die wichtigsten Angaben über deinen Tag und halte deine Auswertungen aktuell';

        scheduleNotification(title, message, moment().day(0));
        scheduleNotification(title, message, moment().day(1));
        scheduleNotification(title, message, moment().day(2));
        scheduleNotification(title, message, moment().day(3));
        scheduleNotification(title, message, moment().day(4));
        scheduleNotification(title, message, moment().day(5));
        scheduleNotification(title, message, moment().day(6));
      }
    });
  }

  renderActiveScreen() {
    switch (this.state.activeScreen) {
      case 'LogScreen':
        return (<LogScreen navigation={this.props.navigation} />);
      case 'MilestoneScreen':
        return (<MilestoneScreen navigation={this.props.navigation} />);
      case 'CommunityScreen':
        return (<CommunityScreen />);
      case 'StatisticScreen':
        return (<StatisticScreen />);
      default:
        return (<LogScreen />);
    }
  }

  renderProfile() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        transparent
        person
        onPress={() => navigate('Profile')}
        style={{ position: 'absolute', right: 15, height: 30 }}
      >
        <Icon
          style={{ color: '#fff' }}
          name="person"
        />
      </Button>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <View style={{ flex: 1 }}>
          <Header>
            <Left>
              <Image source={logo} style={styles.logo} />
            </Left>
            { this.renderProfile() }
          </Header>
          <View style={{ flex: 1 }}>
            { this.renderActiveScreen() }
          </View>
          <Footer>
            <FooterTab>
              <Button
                active={this.state.activeScreen === 'LogScreen'}
                onPress={() => this.setState({ activeScreen: 'LogScreen' })}
              >
                <Icon
                  active={this.state.activeScreen === 'LogScreen'}
                  name="book"
                />
              </Button>
              <Button
                active={this.state.activeScreen === 'CommunityScreen'}
                onPress={() => this.setState({ activeScreen: 'CommunityScreen' })}
              >
                <Icon
                  active={this.state.activeScreen === 'CommunityScreen'}
                  name="calendar"
                />
              </Button>
              <Button
                active={this.state.activeScreen === 'MilestoneScreen'}
                onPress={() => this.setState({ activeScreen: 'MilestoneScreen' })}
              >
                <Icon
                  active={this.state.activeScreen === 'MilestoneScreen'}
                  name="trophy"
                />
              </Button>
              <Button
                active={this.state.activeScreen === 'StatisticScreen'}
                onPress={() => this.setState({ activeScreen: 'StatisticScreen' })}
              >
                <Icon
                  active={this.state.activeScreen === 'StatisticScreen'}
                  name="stats"
                />
              </Button>
            </FooterTab>
          </Footer>
        </View>
      </StyleProvider>
    );
  }
}

const BabyApp = StackNavigator({
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
  Entry: { screen: EntryScreen },
  Register: { screen: RegisterScreen },
  Onboarding: { screen: OnboardingScreen },
  Login: { screen: LoginScreen },
  CreateProfile: { screen: CreateProfileScreen },
  Camera: { screen: CameraScreen },
  MilestoneEntry: { screen: MilestoneEntryScreen }
}, { headerMode: 'screen' });

AppRegistry.registerComponent('BabyApp', () => BabyApp);
