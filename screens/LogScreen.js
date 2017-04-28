import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import LogEntry from '../components/LogEntry';
import MilestoneEntry from '../components/MilestoneEntry';
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

  renderListItem(data) {
    if (data.item.milestone) {
      return (
        <MilestoneEntry
          uri={data.item.image}
        />
      );
    }

    return <LogEntry />;
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
        <FlatList
          data={this.state.entries}
          keyExtractor={item => item.createdAt}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
}
