import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Badge as BadgeNB } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Badge = props => (
  <BadgeNB warning style={{ alignSelf: 'center', justifyContent: 'center', marginRight: 10, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="star" />
      <Text style={{ color: '#FFFFFF' }}>{props.text}</Text>
    </View>
  </BadgeNB>
);

Badge.propTypes = {
  text: PropTypes.string.isRequired
};


export default Badge;
