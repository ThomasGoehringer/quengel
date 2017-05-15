import PushNotification from 'react-native-push-notification';


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

function createNotification() {
  PushNotification.localNotification({
    /* Android Only Properties */
    ticker: 'My Notification Ticker', // (optional)
    largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
    smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
    subText: 'This is a subText', // (optional) default: none
    color: 'red', // (optional) default: system default

    /* iOS and Android properties */
    title: 'My Notification Title', // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message: 'My Notification Message', // (required)
    repeatType: 'day' // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
  });
}

function scheduleNotification() {
  PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotificationSchedule({
    message: 'My scheduled Message', // (required)
    date: new Date(Date.now() + (10 * 1000)) // in 60 secs
  });
}


module.exports = {
  createNotification,
  scheduleNotification
};
