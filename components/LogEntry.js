import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment';
import Separator from 'react-native-hr';
import Badge from '../components/Badge';
import FeelingStatus from '../components/FeelingStatus';

const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    width: null,
    height: 200
  },
  text: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'rgb(50,50,50)'
  },
  textTime: {
    color: 'rgb(120,120,120)',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 10
  }
});

const LogEntry = props => (
  <Card>
    <View style={{ paddingLeft: 15, paddingTop: 15, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
      {props.badges.map(badge =>
        <Badge
          key={badge.badgeType + badge.createdAt}
          text={badge.value}
          feature={badge.badgeType}
        />
      )}
    </View>

    <Separator text={moment().format('DD MMM YY')} lineColor="lightgray" />

    {props.text.map(text =>
      <View key={text.value + text.createdAt}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textTime}>10:38</Text>
          <FeelingStatus emotion="happy" />
        </View>
        <Text style={styles.text}>{text.value}</Text>
      </View>
    )}
  </Card>
);

LogEntry.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape({
    badgeType: PropTypes.string,
    value: PropTypes.string,
    createdAt: PropTypes.string
  })).isRequired,
  text: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    createdAt: PropTypes.string
  })).isRequired
};


export default LogEntry;
