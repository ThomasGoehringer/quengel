import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const styles = StyleSheet.create({
  icon: {
    color: '#FFFFFF',
    marginTop: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 100
  }
});

const FeelingStatus = (props) => {
  let color;

  switch (props.emotion) {
    case 'emoticon-happy':
      color = { color: '#00b572' };
      break;
    case 'emoticon-neutral':
      color = { color: '#5363ab' };
      break;
    case 'emoticon-sad':
      color = { color: '#ff7200' };
      break;
    default:
      color = { color: '#00b572' };
  }

  color = { color: 'rgb(50,50,50)' };

  return (
    <Icon
      size={18}
      style={[styles.icon, color]}
      name={props.emotion}
    />
  );
};

FeelingStatus.propTypes = {
  emotion: PropTypes.string.isRequired
};


export default FeelingStatus;
