import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { scheduleNotification } from '../services/notificationService';

export default class CommunityScreen extends Component {
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
