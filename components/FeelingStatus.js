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
      backgroundColor = { backgroundColor: 'rgb(80, 162, 67)' };
      break;
    case 'neutral':
      backgroundColor = { backgroundColor: 'blue' };
      break;
    case 'sad':
      backgroundColor = { backgroundColor: 'red' };
      break;
    default:
      backgroundColor = { backgroundColor: 'rgb(80, 162, 67)' };
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
