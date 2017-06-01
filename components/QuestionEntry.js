import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  Text,
  StyleSheet
} from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import { COLOR } from '../config/globals';

const styles = StyleSheet.create({
  timeDiff: {
    alignSelf: 'flex-end',
    color: COLOR.SECONDARY
  },
  question: {
    color: 'rgb(50,50,50)',
    marginVertical: 15
  },
  comments: {
    alignSelf: 'flex-end',
    color: COLOR.SECONDARY
  }
});

export default class QuestionEntry extends Component {
  calculateTime(date) {
    const currDate = moment();
    const createdAt = moment(date);
    const diffHours = moment.duration(currDate.diff(createdAt)).hours();
    const diffDays = moment.duration(currDate.diff(createdAt)).days();

    if (diffDays > 0) {
      return createdAt.format('DD MMM YY  hh:mm');
    } else if (diffHours < 1) {
      return 'weniger als 1 h';
    }
    return `${diffHours} h`;
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('QuestionDetail', {
      questionId: this.props._id,
      category: this.props.category,
      createdAt: this.props.createdAt,
      question: this.props.text,
      comments: this.props.comments,
      handleEntry: () => this.props.onUpdate()
    });
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.handlePress()}>
        <Card style={{ padding: 15, marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.timeDiff}>{this.calculateTime(this.props.createdAt)}</Text>
          <Text style={styles.question}>{this.props.title}</Text>
          <Text style={styles.comments}>
            {this.props.comments.length} Kommentare
          </Text>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}
