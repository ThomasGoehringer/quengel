import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';

const styles = StyleSheet.create({
  timeDiff: {
    alignSelf: 'flex-end'
  },
  comments: {
    alignSelf: 'flex-end'
  }
});

export default class QuestionEntry extends Component {
  calculateTime(date) {
    const currDate = moment();
    const createdAt = moment(date);
    const diff = moment.duration(currDate.diff(createdAt)).hours();

    if (diff === 0) {
      return 'vor weniger als 1 h';
    } else if (diff >= 24) {
      const days = Math.floor(diff / 24);
      const hours = diff % 24;
      return `vor ${days} d ${hours} h`;
    }
    return `vor ${diff} h`;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Card style={{ padding: 15 }}>
        <Text style={styles.timeDiff}>{this.calculateTime(this.props.createdAt)}</Text>
        <Text>{this.props.text}</Text>
        <Text
          onPress={false}
          style={styles.comments}
        >
          {this.props.comments.length} Kommentare
        </Text>
      </Card>
    );
  }
}
