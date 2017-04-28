import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import Separator from 'react-native-hr';
import Badge from '../components/Badge';
import FeelingStatus from '../components/FeelingStatus';

const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    width: null,
    height: 200
  },
  text: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'rgb(50,50,50)'
  },
  textTime: {
    color: 'rgb(120,120,120)',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 10
  }
});

export default class LogEntry extends Component {
  render() {
    return (
      <Card>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </View>
        <Separator text={moment().format('DD MMM YY')} lineColor="lightgray" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textTime}>10:38</Text>
          <FeelingStatus emotion="sad" />
        </View>
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
};
