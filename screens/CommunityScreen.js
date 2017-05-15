import React, { Component } from 'react';
import {
  Text
} from 'native-base';
import { scheduleNotification, createNotification } from '../services/notificationService';

export default class CalendarScreen extends Component {
  componentDidMount() {
    scheduleNotification();
    createNotification();
  }

  render() {
    return (
      <Text>Screen Calendar</Text>
    );
  }
}
