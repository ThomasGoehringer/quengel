import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Badge as BadgeNB } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Badge = (props) => {
  let backgroundColor;
  let iconName;

  switch (props.feature) {
    case 'diapers':
      backgroundColor = { backgroundColor: '#ffac49' };
      iconName = 'delete';
      break;
    case 'hydration':
      backgroundColor = { backgroundColor: '#007bff' };
      iconName = 'cup-water';
      break;
    case 'meals':
      backgroundColor = { backgroundColor: '#ff5333' };
      iconName = 'food-apple';
      break;
    case 'nursing':
      backgroundColor = { backgroundColor: '#00c4b7' };
      iconName = 'timer';
      break;
    case 'weight':
      backgroundColor = { backgroundColor: '#c557b4' };
      iconName = 'scale-bathroom';
      break;
    case 'height':
      backgroundColor = { backgroundColor: '#c557b4' };
      iconName = 'ruler';
      break;
    case 'headCircumference':
      backgroundColor = { backgroundColor: '#c557b4' };
      iconName = 'face';
      break;
    default:
      backgroundColor = { backgroundColor: '#ffac49' };
      iconName = 'star';
  }

  return (
    <BadgeNB style={{ alignSelf: 'center', justifyContent: 'center', marginRight: 10, marginBottom: 10, ...backgroundColor }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={iconName} size={14} />
        <Text style={{ color: '#FFFFFF', paddingHorizontal: 5 }}>{props.text}</Text>
      </View>
    </BadgeNB>
  );
};

Badge.propTypes = {
  feature: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};


export default Badge;
