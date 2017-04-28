import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {
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
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import CalendarScreen from './screens/CalendarScreen';
import StatisticScreen from './screens/StatisticScreen';
import EntryScreen from './screens/EntryScreen';
import ProfilScreen from './screens/ProfilScreen';


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
        style={{ backgroundColor: '#5067FF', position: 'absolute', bottom: 30 }}
        position="bottomRight"
      >
        <Icon name="add" />
      </Fab>
    );
  }

  renderProfil() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => navigate('Profil')}
        direction="down"
        style={{ backgroundColor: '#3F51B5', position: 'absolute', bottom: 40 }}
        position="topRight"
      >
        <Icon name="person" />
      </Fab>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Baby App</Title>
            { this.state.activeScreen === 'LogScreen' && this.renderProfil() }
          </Body>
        </Header>
        <Content>
          { this.renderActiveScreen() }
        </Content>
        { this.state.activeScreen === 'LogScreen' && this.renderFab() }
        <Footer >
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
    );
  }
}


const BabyApp = StackNavigator({
  Main: { screen: MainScreen },
  Entry: { screen: EntryScreen },
  Profil: { screen: ProfilScreen }
}, { headerMode: 'screen' });


AppRegistry.registerComponent('BabyApp', () => BabyApp);
