import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Fab,
  Icon,
  Card,
  CardItem,
  Body
} from 'native-base';
import LogEntry from '../components/LogEntry';

export default class LogScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <LogEntry />
        <Fab
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
