import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import Separator from 'react-native-hr';
import Badge from '../components/Badge';
import FeelingStatus from '../components/FeelingStatus';

const styles = StyleSheet.create({
  text: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    color: 'rgb(50,50,50)'
  },
  textTime: {
    color: 'rgb(120,120,120)',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 10
  }
});

export default class LogEntry extends Component {
  renderBadges() {
    // Merge badges with same badgeType together
    const mergedBadges = Object.values(this.props.badges.reduce((acc, item) => {
      const obj = acc[item.badgeType] ? {
        ...acc[item.badgeType],
        value: (Number(acc[item.badgeType].value) + Number(item.value)).toString()
      } : item;

      acc[item.badgeType] = obj;
      return acc;
    }, {}));

    return mergedBadges.map(badge =>
      <Badge
        key={badge.badgeType + badge.createdAt}
        text={badge.unit ? badge.value + badge.unit : badge.value}
        feature={badge.badgeType}
      />
    );
  }

  render() {
    return (
      <Card style={this.props.text.length === 0 ? { paddingBottom: 15 } : {}}>
        <View style={{ paddingLeft: 15, paddingTop: 15, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          {this.renderBadges()}
        </View>

        <Separator text={moment(this.props.createdAt).format('DD MMM YY')} lineColor="lightgray" />

        {this.props.text.map(text =>
          <View key={text.value + text.createdAt}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.textTime}>{moment(text.createdAt).format('HH:mm')}</Text>
              {text.emotion && <FeelingStatus emotion={text.emotion} />}
            </View>
            <Text style={styles.text}>{text.value}</Text>
          </View>
        )}
      </Card>
    );
  }
}

LogEntry.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape({
    badgeType: PropTypes.string,
    value: PropTypes.string,
    createdAt: PropTypes.string
  })).isRequired,
  text: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    createdAt: PropTypes.string
  })).isRequired,
  createdAt: PropTypes.string.isRequired
};
