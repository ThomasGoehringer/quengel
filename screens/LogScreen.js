import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import { COLOR } from '../config/globals';
import LogEntry from '../components/LogEntry';
import databaseService from '../services/databaseService';
import { getData, setData } from '../services/storageService';
import { transformCharts } from '../services/helperService';
import logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  logo: {
    marginLeft: 15,
    justifyContent: 'center',
    width: 60,
    height: 60
  }
});

export default class LogScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      entries: []
    };
  }

  static navigationOptions = {
    headerTitle: 'Tagebuch',
    headerLeft: <Image source={logo} style={styles.logo} />,
    headerRight: null,
    headerTitleStyle: {
      fontWeight: 'normal',
      marginLeft: 40
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
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
    if (!data.item.milestone) {
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
          keyExtractor={item => item.createdAt + item.milestoneType}
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
