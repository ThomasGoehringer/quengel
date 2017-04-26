import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';


export default class LogTextEntry extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
