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
import { StackNavigator } from 'react-navigation';
import getTheme from './config/native-base-theme/components';
import platform from './config/native-base-theme/variables/platform';
import EntryScreen from './screens/EntryScreen';
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import CalendarScreen from './screens/CalendarScreen';
import StatisticScreen from './screens/StatisticScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import { getData } from './services/storageService';
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
      activeScreen: 'LogScreen',
      isLoggedIn: true
    };
  }

  componentWillMount() {
    getData('user').then((data) => {
      if (!data) {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  renderActiveScreen() {
    switch (this.state.activeScreen) {
      case 'LogScreen':
        return (<LogScreen navigation={this.props.navigation} />);
      case 'MilestoneScreen':
        return (<MilestoneScreen />);
      case 'CalendarScreen':
        return (<CalendarScreen />);
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
        active={this.state.activeScreen === 'ProfilScreen'}
        onPress={() => navigate('Profile')}
        style={{ position: 'absolute', right: 15, height: 30 }}
      >
        <Icon
          active={this.state.activeScreen === 'ProfilScreen'}
          style={{ color: '#fff' }}
          name="person"
        />
      </Button>
    );
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <RegisterScreen navigation={this.props.navigation} />
      );
    }

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
                active={this.state.activeScreen === 'CalendarScreen'}
                onPress={() => this.setState({ activeScreen: 'CalendarScreen' })}
              >
                <Icon
                  active={this.state.activeScreen === 'CalendarScreen'}
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
  Register: { screen: RegisterScreen }
}, { headerMode: 'screen' });

AppRegistry.registerComponent('BabyApp', () => BabyApp);
