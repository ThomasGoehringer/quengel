import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Body,
  Title
} from 'native-base';
import LogScreen from './screens/LogScreen';
import MilestoneScreen from './screens/MilestoneScreen';
import CalendarScreen from './screens/CalendarScreen';
import StatisticScreen from './screens/StatisticScreen';


export default class BabyApp extends Component {
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
        console.log(this.state.activeScreen);
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

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Baby App</Title>
          </Body>
        </Header>
        <Content>
          { this.renderActiveScreen() }
        </Content>
        <Footer >
          <FooterTab>
            <Button
              active={this.state.activeScreen === 'LogScreen'}
              onPress={() => this.setState({ activeScreen: 'LogScreen' })}
            >
              <Text>Day</Text>
            </Button>
            <Button
              active={this.state.activeScreen === 'CalendarScreen'}
              onPress={() => this.setState({ activeScreen: 'CalendarScreen' })}
            >
              <Text>Calendar</Text>
            </Button>
            <Button
              active={this.state.activeScreen === 'MilestoneScreen'}
              onPress={() => this.setState({ activeScreen: 'MilestoneScreen' })}
            >
              <Text>Milestones</Text>
            </Button>
            <Button
              active={this.state.activeScreen === 'StatisticScreen'}
              onPress={() => this.setState({ activeScreen: 'StatisticScreen' })}
            >
              <Text>Statistics</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


AppRegistry.registerComponent('BabyApp', () => BabyApp);
