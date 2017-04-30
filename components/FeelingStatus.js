import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const styles = StyleSheet.create({
  icon: {
    color: '#FFFFFF',
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 100
  }
});

const FeelingStatus = (props) => {
  let backgroundColor;

  switch (props.emotion) {
    case 'happy':
      backgroundColor = { backgroundColor: '#00b572' };
      break;
    case 'neutral':
      backgroundColor = { backgroundColor: '#5363ab' };
      break;
    case 'sad':
      backgroundColor = { backgroundColor: '#ff7200' };
      break;
    default:
      backgroundColor = { backgroundColor: '#00b572' };
  }

  return (
    <Icon
      size={14}
      style={[styles.icon, backgroundColor]}
      name={`emoticon-${props.emotion}`}
    />
  );
};

FeelingStatus.propTypes = {
  emotion: PropTypes.string.isRequired
};


export default FeelingStatus;
