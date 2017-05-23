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
    let mergedBadges = Object.values(this.props.badges.reduce((acc, item) => {
      const obj = acc[item.badgeType] ? {
        ...acc[item.badgeType],
        value: (Number(acc[item.badgeType].value) + Number(item.value)).toString()
      } : item;

      acc[item.badgeType] = obj;
      return acc;
    }, {}));

    // Merge nursinLeft and nursingRight to nursing
    mergedBadges = Object.values(mergedBadges.reduce((acc, item) => {
      if (item.badgeType.indexOf('Left') > 0 || item.badgeType.indexOf('Right') > 0) {
        const badgeType = item.badgeType.replace('Left', '').replace('Right', '');
        const side = item.badgeType.replace(badgeType, '').toLowerCase();
        let found = Object.values(acc).find(obj => obj.badgeType === badgeType);

        if (found) {
          found.value[side] = item.value;
        } else {
          found = {
            badgeType,
            unit: item.unit,
            value: { [side]: item.value }
          };
        }

        acc[badgeType] = found;
        return acc;
      }

      acc[item.badgeType] = item;
      return acc;
    }, {}));

    // Sort badges by badgeType
    mergedBadges.sort((a, b) => a.badgeType.localeCompare(b.badgeType));

    return mergedBadges.map((badge) => {
      if (badge.badgeType === 'nursing') {
        const sum = Number(badge.value.left) + Number(badge.value.right);
        const formattedSum = moment.utc(sum * 1000).format('m:ss');

        return (
          <Badge
            key={badge.badgeType + badge.createdAt}
            text={`${formattedSum} min`}
            feature={badge.badgeType}
          />
        );
      }
      return (
        <Badge
          key={badge.badgeType + badge.createdAt}
          text={badge.unit ? `${badge.value} ${badge.unit}` : badge.value}
          feature={badge.badgeType}
        />
      );
    });
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
