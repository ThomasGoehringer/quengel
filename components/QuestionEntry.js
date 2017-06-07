import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import { excerpt } from '../services/helperService';
import { COLOR, FONTSIZE } from '../config/globals';

const styles = StyleSheet.create({
  category: {
    color: COLOR.SECONDARY,
    fontSize: FONTSIZE.CAPTION,
    marginBottom: 5
  },
  timeDiff: {
    textAlign: 'right',
    flexGrow: 1,
    color: COLOR.SECONDARY,
    fontSize: FONTSIZE.CAPTION
  },
  headerContainer: {
    flexDirection: 'row'
  },
  questionTitle: {
    flexShrink: 1,
    color: COLOR.DARKGRAY,
    fontSize: FONTSIZE.SUBHEADING,
    marginBottom: 5
  },
  questionText: {
    color: COLOR.DARKGRAY
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
      return createdAt.format('DD.MM.YY  HH:mm');
    } else if (diffHours < 1) {
      return 'weniger als 1 h';
    }
    return `${diffHours} h`;
  }

  getCategory() {
    switch (this.props.category) {
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

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('QuestionDetail', {
      questionId: this.props._id,
      category: this.props.category,
      createdAt: this.props.createdAt,
      text: this.props.text,
      title: this.props.title,
      comments: this.props.comments,
      handleEntry: () => this.props.onUpdate()
    });
  }

  render() {
    let textExcerpt;
    if (this.props.text.length > 90) {
      textExcerpt = excerpt(this.props.text, 90);
    } else if (this.props.length === 0) {
      textExcerpt = '';
    } else {
      textExcerpt = this.props.text;
    }

    return (
      <TouchableNativeFeedback onPress={() => this.handlePress()}>
        <Card style={{ padding: 15, marginLeft: 10, marginRight: 10 }}>
          {this.props.showCategory ?
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.category}>{this.getCategory()}</Text>
                <Text style={styles.timeDiff}>{this.calculateTime(this.props.createdAt)}</Text>
              </View>
              <Text style={styles.questionTitle}>{this.props.title}</Text>
            </View> :
            <View style={styles.headerContainer}>
              <Text style={styles.questionTitle}>{this.props.title}</Text>
              <Text style={styles.timeDiff}>{this.calculateTime(this.props.createdAt)}</Text>
            </View>
          }

          {textExcerpt.length !== 0 ?
            <Text style={styles.questionText}>{textExcerpt}</Text> : null
          }

          <Text style={styles.comments}>
            {this.props.comments.length} Kommentare
          </Text>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}
