import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  Icon
} from 'native-base';
import Fab from 'react-native-action-button';
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
    this.updateEntries();
  }

  updateEntries() {
    databaseService.getEntries().then((entries) => {
      this.setState({ loading: false, entries: entries.reverse() });
    });
  }

  renderFab() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => {
          navigate('Entry', {
            handleEntry: () => this.updateEntries()
          });
        }}
        degrees={0}
        backgroundTappable
        buttonColor="#4e788b"
        useNativeFeedback
      >
        <Icon name="add" />
      </Fab>
    );
  }

  renderListItem(data) {
    if (data.item.milestone) {
      return (
        <MilestoneEntry
          uri={data.item.image}
        />
      );
    }

    return <LogEntry {...data.item} />;
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
      <View>
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={this.state.entries}
          keyExtractor={item => item.createdAt}
          renderItem={this.renderListItem}
        />
        { this.renderFab() }
      </View>
    );
  }
}
