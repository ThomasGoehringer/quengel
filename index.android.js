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
    return (
      <Fab
        direction="up"
        style={{ backgroundColor: '#5067FF', position: 'absolute', bottom: 30 }}
        position="bottomRight"
      >
        <Icon name="add" />
      </Fab>
    );
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


AppRegistry.registerComponent('BabyApp', () => BabyApp);
