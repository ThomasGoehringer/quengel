import React, { Component } from 'react';
import {
  Text
} from 'native-base';
import { scheduleNotification } from '../services/notificationService';

export default class CalendarScreen extends Component {
  componentDidMount() {
    scheduleNotification();
  }

  render() {
    return (
      <Text>Screen Calendar</Text>
    );
  }
}
