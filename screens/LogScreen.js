import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import LogImageEntry from '../components/LogImageEntry';
import databaseService from '../services/databaseService';


export default class LogScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      entries: []
    };
  }

  componentDidMount() {
    databaseService.getEntries().then((entries) => {
      this.setState({ loading: false, entries });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ padding: 10 }}>
        <FlatList data={[{key: 'a'}, {key: 'b'}]} renderItem={({item}) => <LogImageEntry />} />
      </View>
    );
  }
}
