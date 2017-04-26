import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Container,
  Text,
  Fab,
  Icon
} from 'native-base';

export default class LogScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Text>Screen</Text>
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
