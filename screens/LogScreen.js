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
import { COLOR } from '../config/globals';
import LogEntry from '../components/LogEntry';
import MilestoneEntry from '../components/MilestoneEntry';
import databaseService from '../services/databaseService';
import { getData } from '../services/storageService';


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
    getData('user')
      .then(databaseService.getEntries)
      .then((entries) => {
        this.setState({ loading: false, entries: entries.reverse() });
        this.logList.scrollToOffset({ x: 0, y: 0, animated: true });
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
        buttonColor={COLOR.PRIMARY}
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
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
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
          ListHeaderComponent={() => <View style={{ paddingTop: 10 }} />}
          ListFooterComponent={() => <View style={{ paddingTop: 10 }} />}
          ref={(list) => { this.logList = list; }}
        />
        { this.renderFab() }
      </View>
    );
  }
}
