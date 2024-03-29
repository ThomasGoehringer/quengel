import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
  RefreshControl
} from 'react-native';
import moment from 'moment';
import { COLOR, FONTSIZE } from '../config/globals';
import { getData } from '../services/storageService';
import { createComment, getQuestionById } from '../services/databaseService';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE
  },
  questionCategory: {
    fontSize: FONTSIZE.CAPTION,
    color: COLOR.PRIMARY
  },
  questionDate: {
    textAlign: 'right',
    flex: 1,
    fontSize: FONTSIZE.CAPTION,
    color: COLOR.PRIMARY
  },
  questionHeadline: {
    fontSize: FONTSIZE.HEADLINE,
    paddingVertical: 10,
    color: COLOR.WHITE
  },
  questionText: {
    fontSize: FONTSIZE.BODY,
    paddingBottom: 10,
    color: COLOR.WHITE
  },
  comment: {
    padding: 15
  },
  commentDate: {
    color: COLOR.SECONDARY,
    fontSize: FONTSIZE.CAPTION
  },
  commentText: {
    color: COLOR.TEXT
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.SECONDARY
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    color: COLOR.WHITE
  },
  button: {
    color: COLOR.WHITE,
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
      text,
      title,
      comments
    } = this.props.navigation.state.params;

    this.setState({
      questionId,
      createdAt,
      text,
      title,
      category,
      comments: comments.reverse()
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
    updatedComments.unshift(newComment);

    this.setState({ comments: updatedComments, comment: '' });
  }

  getCategory() {
    switch (this.state.category) {
      case 'food':
        return 'Ernährung';
      case 'helpers':
        return 'Alltagshelfer';
      case 'development':
        return 'Entwicklung & Erziehung';
      case 'family':
        return 'Familie, Partnerschaft & Sex';
      case 'work':
        return 'Baby & Job';
      case 'legal':
        return 'Rechtliches';
      case 'mother':
        return 'Muttiforum';
      case 'contacts':
        return 'Kontakte';
      default:
        return '';
    }
  }

  updateQuestion() {
    getData('user')
      .then((user) => {
        getQuestionById(this.state.questionId, user.jwt)
          .then((question) => {
            this.setState({ comments: question.comments.reverse() });
          });
      });
  }

  renderListHeader() {
    return (
      <View elevation={3} style={{ backgroundColor: COLOR.SECONDARY, padding: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.questionCategory}>{this.getCategory()}</Text>
          <Text style={styles.questionDate}>{moment(this.state.createdAt).format('DD.MM.YY  HH:mm')}</Text>
        </View>
        <Text style={styles.questionHeadline}>{this.state.title}</Text>
        <Text style={styles.questionText}>{this.state.text}</Text>
      </View>
    );
  }

  renderListSeparator() {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLOR.LIGHTGRAY,
          marginHorizontal: 15
        }}
      />
    );
  }

  renderListItem(data) {
    return (
      <View
        style={styles.comment}
        key={data.item.createdAt + data.item.text}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.commentDate}>{moment(data.item.createdAt).format('DD.MM.YY  HH:mm')}</Text>
        </View>
        <Text style={styles.commentText}>{data.item.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.comments}
          keyExtractor={comment => comment.createdAt}
          renderItem={this.renderListItem}
          ItemSeparatorComponent={() => this.renderListSeparator()}
          ListHeaderComponent={() => this.renderListHeader()}
          ListFooterComponent={() => <View style={{ paddingTop: 10 }} />}
          refreshControl={
            <RefreshControl
              colors={[COLOR.SECONDARY]}
              refreshing={false}
              onRefresh={() => this.updateQuestion()}
            />
          }
        />
        <View
          elevation={8}
          style={styles.textInputContainer}
        >
          <TextInput
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            placeholder="Kommentar hinzufügen"
            placeholderTextColor={COLOR.PRIMARY}
            selectionColor={COLOR.LIGHTGRAY}
            style={styles.textInput}
            underlineColorAndroid={COLOR.WHITE}
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
