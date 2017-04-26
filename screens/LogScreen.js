import React, { Component } from 'react';
import {
  Container,
  Fab,
  Icon
} from 'native-base';
import LogEntry from '../components/LogTextEntry';

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
