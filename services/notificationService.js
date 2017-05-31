import PushNotification from 'react-native-push-notification';
import { getData, setData } from '../services/storageService';
import { COLOR } from '../config/globals';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    console.log('TOKEN:', token);
  },
  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: true
});

function notificationsEnabled() {
  return getData('notifications');
}

function enableNotifications(enabled) {
  setData('notifications', enabled);

  if (!enabled) {
    PushNotification.cancelAllLocalNotifications();
  }
}

function scheduleNotification(title, message, date) {
  PushNotification.localNotificationSchedule({
    color: COLOR.SECONDARY,
    title,
    message,
    date: new Date(date)
  });
}


module.exports = {
  notificationsEnabled,
  enableNotifications,
  scheduleNotification
};
