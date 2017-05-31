import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { createComment } from '../services/databaseService';


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
      questionId: '',
      comment: ''
    };
  }

  componentWillMount() {
    this.setState({ questionId: this.props.navigation.state.params.questionId });
  }

  handleSubmit() {
    getData('user')
      .then((user) => {
        createComment(this.state.questionId, this.state.comment, user.jwt);
      });
  }

  render() {
    return (
      <View>
        <Text>{this.state.questionId}</Text>
        <TextInput
          onChangeText={comment => this.setState({ comment })}
          placeholder="Kommentar hinzufügen"
          selectionColor={COLOR.PRIMARY}
          underlineColorAndroid={COLOR.SECONDARY}
        />
        <Button
          color={COLOR.SECONDARY}
          onPress={() => this.handleSubmit()}
          title="Hinzufügen"
        />
      </View>
    );
  }
}
