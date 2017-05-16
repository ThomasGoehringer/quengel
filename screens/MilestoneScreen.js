import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import { COLOR } from '../config/globals';
import databaseService from '../services/databaseService';
import { getData } from '../services/storageService';


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class MilestoneScreen extends Component {
  constructor() {
    super();
    this.state = {
      imagePath: '',
      text: ''
    };
  }

  handleSubmit() {
    const { goBack } = this.props.navigation;

    const entry = {
      text: this.state.text,
      imagePath: this.state.imagePath,
      milestone: true
    };

    getData('user').then((data) => {
      databaseService.createMilestone(entry, data.jwt);
    });
  }

  renderFab() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => {
          navigate('MilestoneEntry');
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
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        { this.renderFab() }
      </View>
    );
  }
}
