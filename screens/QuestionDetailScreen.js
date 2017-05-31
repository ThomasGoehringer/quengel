import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import moment from 'moment';
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
    const {
      questionId,
      createdAt,
      category,
      question,
      comments
    } = this.props.navigation.state.params;

    this.setState({
      questionId,
      createdAt,
      question,
      category,
      comments
    });
  }

  handleSubmit() {
    const commentText = this.state.comment;
    getData('user')
      .then((user) => {
        createComment(this.state.questionId,
           commentText, user.jwt);
      });

    // Update comment list to provide instant feedback
    const newComment = {
      text: this.state.comment,
      createdAt: moment().toISOString()
    };

    const updatedComments = this.state.comments;
    updatedComments.push(newComment);

    this.setState({ comments: updatedComments, comment: '' });
  }

  render() {
    return (
      <View>
        <Text>{this.state.question}</Text>
        <Text>{this.state.createdAt}</Text>
        <Text>{this.state.category}</Text>

        {this.state.comments.map(comment =>
          <View key={comment.createdAt + comment.text}>
            <Text>{comment.text}</Text>
            <Text>{comment.createdAt}</Text>
          </View>
        )}

        <TextInput
          value={this.state.comment}
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
