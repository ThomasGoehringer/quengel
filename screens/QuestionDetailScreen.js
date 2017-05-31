import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback
} from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import { COLOR, FONTSIZE } from '../config/globals';
import { getData } from '../services/storageService';
import { createComment } from '../services/databaseService';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  commentText: {
    flex: 2
  },
  commentDate: {
    flex: 1,
    alignSelf: 'flex-end'
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

    if (commentText === '') {
      ToastAndroid.show('Das Kommentarfeld muss ausgefüllt sein!', ToastAndroid.SHORT);
      return;
    }

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

  renderListItem(data) {
    return (
      <View
        style={styles.comment}
        key={data.item.createdAt + data.item.text}
      >
        <Text style={styles.commentText}>{data.item.text}</Text>
        <Text style={styles.commentDate}>{moment(data.item.createdAt).format('DD MMM YY  hh:mm')}</Text>
      </View>
    );
  }

  render() {
    const commentsReversed = this.state.comments;

    return (
      <View style={styles.container}>
        <Card style={{ padding: 15 }}>
          <Text>{this.state.question}</Text>
          <Text>{this.state.createdAt}</Text>
          <Text>{this.state.category}</Text>
        </Card>
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={commentsReversed}
          keyExtractor={comment => comment.createdAt}
          renderItem={this.renderListItem}
          ListHeaderComponent={() => <View style={{ paddingTop: 10 }} />}
          ListFooterComponent={() => <View style={{ paddingTop: 10 }} />}
        />
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
