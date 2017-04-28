import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { Card, CardItem, Button, Icon, Left, Body, Right } from 'native-base';
import Separator from 'react-native-hr';
import Badge from '../components/Badge';


const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    width: null,
    height: 200,
    flex: 1
  },
  text: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'rgb(50,50,50)'
  },
  textTime: {
    color: '#5067FF',
    paddingTop: 10,
    paddingLeft: 20
  }
});

export default class LogEntry extends Component {
  render() {
    return (
      <Card>
        <CardItem cardBody>
          <Image
            style={styles.img}
            source={{ uri: this.props.uri }}
          />
        </CardItem>
        <CardItem>
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </CardItem>
        <Separator text={Date()} lineColor="lightgray" />
        <Text style={styles.textTime}>10:38</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text style={styles.textTime}>16:42</Text>
        <Text style={styles.text}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Card>
    );
  }
}

LogEntry.propTypes = {
  uri: PropTypes.string.isRequired
};
