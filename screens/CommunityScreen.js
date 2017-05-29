import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import { scheduleNotification } from '../services/notificationService';
import logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  logo: {
    marginLeft: 15,
    justifyContent: 'center',
    width: 60,
    height: 60
  }
});

export default class CommunityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Community',
    headerLeft: <Image source={logo} style={styles.logo} />,
    headerRight: null,
    headerTitleStyle: {
      fontWeight: 'normal',
      marginLeft: 40
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  render() {
    return (
      <View>
        <Text>Screen Community</Text>
        <Button
          title="Show Notification"
          onPress={() => scheduleNotification(
            'Heute schon alles erfasst?',
            'Erfasse schnell die wichtigsten Angaben über deinen Tag und halte deine Auswertungen aktuell',
            new Date(Date.now() + (5 * 1000))
          )}
        />
      </View>
    );
  }
}
