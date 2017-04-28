import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Badge as BadgeNB } from 'native-base';


const Badge = props => (
  <BadgeNB warning style={{ alignSelf: 'center', justifyContent: 'center', marginRight: 10 }}>
    <Text style={{ color: '#FFFFFF' }}>Quiet</Text>
  </BadgeNB>
);

Badge.propTypes = {
};


export default Badge;
