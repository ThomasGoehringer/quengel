import React, { Component } from 'react';
import {
  View
} from 'react-native';
import LogTextEntry from '../components/LogTextEntry';
import LogImageEntry from '../components/LogImageEntry';

export default class LogScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <LogTextEntry />
        <LogImageEntry />
        <LogImageEntry />
        <LogTextEntry />
        <LogImageEntry />
      </View>
    );
  }
}
