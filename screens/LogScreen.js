import React, { Component } from 'react';
import {
  View
} from 'react-native';
import LogTextEntry from '../components/LogTextEntry';

export default class LogScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <View>
        <LogTextEntry />
      </View>
    );
  }
}
