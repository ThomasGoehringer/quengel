import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import { COLOR } from '../config/globals';
import { scheduleNotification } from '../services/notificationService';

export default class CommunityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Community',
    headerRight: null,
    headerTitleStyle: {
      fontWeight: 'normal',
      marginLeft: 15
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  updateEntries() {
    // TODO
  }

  renderFab() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => {
          navigate('Question', {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Screen Community</Text>
        { this.renderFab() }
      </View>
    );
  }
}
