import React, { Component } from 'react';
import {
  Keyboard,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import moment from 'moment';
import { COLOR, FONTSIZE } from '../config/globals';
import { getData } from '../services/storageService';
import { createComment } from '../services/databaseService';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5
  },
  button: {
    color: COLOR.DARKGRAY,
    alignSelf: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: FONTSIZE.BODY
  }
});

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
        createComment(this.state.questionId, commentText, user.jwt).then(() => {
          // Callback to CommunityScreen
          this.props.navigation.state.params.handleEntry();
        });
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text>{this.state.question}</Text>
          <Text>{this.state.createdAt}</Text>
          <Text>{this.state.category}</Text>

          {this.state.comments.map(comment =>
            <View key={comment.createdAt + comment.text}>
              <Text>{comment.text}</Text>
              <Text>{comment.createdAt}</Text>
            </View>
          )}
        </ScrollView>
        <View
          elevation={8}
          style={styles.textInputContainer}
        >
          <TextInput
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            placeholder="Kommentar hinzufügen"
            selectionColor={COLOR.PRIMARY}
            style={styles.textInput}
            underlineColorAndroid={COLOR.SECONDARY}
          />
          <TouchableNativeFeedback>
            <Text
              style={styles.button}
              onPress={() => {
                this.handleSubmit();
                Keyboard.dismiss();
              }}
            >
              FERTIG
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
