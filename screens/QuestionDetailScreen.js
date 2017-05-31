import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  FlatList
} from 'react-native';
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { getQuestions } from '../services/databaseService';
import QuestionEntry from '../components/QuestionEntry';

export default class QuestionDetailScreen extends Component {
  static navigationOptions = {
    headerTitle: '',
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

  constructor() {
    super();
    this.state = {
      questionId: ''
    };
  }

  componentWillMount() {
    this.setState({ questionId: this.props.navigation.state.params.questionId });
  }

  render() {
    return (
      <Text>{this.state.questionId}</Text>
    );
  }
}
