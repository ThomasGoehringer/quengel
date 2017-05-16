import React, { Component } from 'react';
import {
  View,
  Text,
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
      .then((user) => {
        if (user && user.name) {
          databaseService.getEntries(user.jwt)
            .then((entries) => {
              this.setState({ loading: false, entries: entries.reverse() });

              const filteredEntries = this.state.entries.filter(entry => !entry.milestone);
              if (filteredEntries.length !== 0) {
                this.logList.scrollToOffset({ x: 0, y: 0, animated: true });
              }
            });
        }
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
      // return (
      //   <MilestoneEntry
      //     uri={data.item.imagePath}
      //   />
      // );
    } else {
      return <LogEntry {...data.item} />;
    }
  }

  render() {
    const filteredEntries = this.state.entries.filter(entry => !entry.milestone);

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
        </View>
      );
    }

    if (filteredEntries.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text>Keine Einträge vorhanden</Text>
          { this.renderFab() }
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
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
