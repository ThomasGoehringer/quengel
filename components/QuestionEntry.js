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
    marginVertical: 5
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
    const diff = moment.duration(currDate.diff(createdAt)).hours();

    if (diff < 1) {
      return 'vor weniger als 1 h';
    } else if (diff >= 24) {
      const days = Math.floor(diff / 24);
      const hours = diff % 24;
      return `vor ${days} d ${hours} h`;
    }
    return `vor ${diff} h`;
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('QuestionDetail', { questionId: this.props._id });
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.handlePress()}>
        <Card style={{ padding: 15 }}>
          <Text style={styles.timeDiff}>{this.calculateTime(this.props.createdAt)}</Text>
          <Text>{this.props.text}</Text>
          <Text style={styles.comments}>
            {this.props.comments.length} Kommentare
          </Text>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}
