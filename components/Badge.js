import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge as BadgeNB } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  badge: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    paddingHorizontal: 5
  }
});

const Badge = (props) => {
  let backgroundColor;
  let iconName;

  switch (props.feature) {
    case 'diapers':
      backgroundColor = { backgroundColor: COLOR.DIAPERS };
      iconName = 'delete';
      break;
    case 'hydration':
      backgroundColor = { backgroundColor: COLOR.HYDRATION };
      iconName = 'cup-water';
      break;
    case 'meals':
      backgroundColor = { backgroundColor: COLOR.MEALS };
      iconName = 'food-apple';
      break;
    case 'nursingLeft':
      backgroundColor = { backgroundColor: COLOR.NURSING };
      iconName = 'timer';
      break;
    case 'nursingRight':
      backgroundColor = { backgroundColor: COLOR.NURSING };
      iconName = 'timer';
      break;
    case 'weight':
      backgroundColor = { backgroundColor: COLOR.MEASUREMENT };
      iconName = 'scale-bathroom';
      break;
    case 'height':
      backgroundColor = { backgroundColor: COLOR.MEASUREMENT };
      iconName = 'ruler';
      break;
    case 'headCircumference':
      backgroundColor = { backgroundColor: COLOR.MEASUREMENT };
      iconName = 'face';
      break;
    default:
      backgroundColor = { backgroundColor: COLOR.PRIMARY };
      iconName = 'star';
  }

  const badgeNBStyle = Object.assign({}, StyleSheet.flatten(styles.badge), backgroundColor);

  return (
    <BadgeNB style={badgeNBStyle}>
      <View style={styles.container}>
        <Icon name={iconName} size={14} />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </BadgeNB>
  );
};

Badge.propTypes = {
  feature: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};


export default Badge;
