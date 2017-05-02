import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  StyleProvider,
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Header,
  Body,
  Title,
  Fab,
  Icon
} from 'native-base';
import {
  StackNavigator
} from 'react-navigation';
import getTheme from './config/native-base-theme/components';
import platform from './config/native-base-theme/variables/platform';
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import CalendarScreen from './screens/CalendarScreen';
import StatisticScreen from './screens/StatisticScreen';
import EntryScreen from './screens/EntryScreen';
import ProfileScreen from './screens/ProfileScreen';


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

  renderActiveScreen() {
    switch (this.state.activeScreen) {
      case 'LogScreen':
        return (<LogScreen />);
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

  renderFab() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => navigate('Entry')}
        direction="up"
        style={{ backgroundColor: '#f64228', position: 'absolute', bottom: 35 }}
        position="bottomRight"
      >
        <Icon name="add" />
      </Fab>
    );
  }

  renderProfile() {
    const { navigate } = this.props.navigation;

    return (
      <Button transparent person
        active={this.state.activeScreen === 'ProfilScreen'}
        onPress={() => navigate('Profile')}
        style={{ position: 'absolute', right: 0, height: 30 }}
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
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Body>
            <Title>Quengel</Title>
            { this.state.activeScreen === 'LogScreen' && this.renderProfile() }
          </Body>
        </Header>
        <Content>
          { this.renderActiveScreen() }
        </Content>
        { this.state.activeScreen === 'LogScreen' && this.renderFab() }
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
      </Container>
      </StyleProvider>
    );
  }
}


const BabyApp = StackNavigator({
  Main: { screen: MainScreen },
  Entry: { screen: EntryScreen },
  Profile: { screen: ProfileScreen }
}, { headerMode: 'screen' });


AppRegistry.registerComponent('BabyApp', () => BabyApp);
