import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData, removeData, setData } from '../services/storageService';
import { createProfile, getProfile } from '../services/databaseService';
import { enableNotifications, scheduleNotification } from '../services/notificationService';
import NameModal from '../components/NameModal';
import GenderModal from '../components/GenderModal';
import BirthdayModal from '../components/BirthdayModal';
import profile from '../assets/images/quengel_thumb.png';
import { COLOR } from '../config/globals';

const styles = StyleSheet.create({
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  itemsContainer: {
    padding: 25
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8
  },
  itemText1: {
    flex: 2,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  itemText2: {
    flex: 3,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  labelIcon: {
    marginLeft: 15
  },
  itemIcon: {
    width: 30,
    justifyContent: 'flex-end',
    marginLeft: 15
  },
  boldFont_left: {
    justifyContent: 'flex-end',
    textAlign: 'left'
  },
  boldFont_right: {
    justifyContent: 'flex-end',
    textAlign: 'right'
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 150,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    headerTitle: 'Profil',
    headerRight: null,
    headerTitleStyle: {
      color: COLOR.DARKGRAY,
      fontWeight: 'normal'
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      loading: true,
      text: '',
      email: '',
      modalVisible: false,
      activeModal: '',
      notificationsEnabled: true,
      avatar: ''
    };

    this.handleNotificationSwitchChange = this.handleNotificationSwitchChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount() {
    getData('user').then((user) => {
      this.setState({
        name: user.name,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        email: user.email
      });

      getProfile(user.jwt).then((profileData) => {
        this.setState({
          avatar: profileData.avatar
        });
      });
    });

    getData('notifications').then((enabled) => {
      this.setState({ notificationsEnabled: enabled, loading: false });
    });
  }

  handleNotificationSwitchChange(value) {
    this.setState({ notificationsEnabled: value });
    enableNotifications(value);
  }

  handleModalSubmit() {
    this.setState({
      modalVisible: false,
      activeModal: ''
    });
  }

  renderNameModal() {
    if (this.state.activeModal === 'NameModal') {
      return (
        <NameModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }

  renderGenderModal() {
    if (this.state.activeModal === 'GenderModal') {
      return (
        <GenderModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }

  renderBirthdayModal() {
    if (this.state.activeModal === 'BirthdayModal') {
      return (
        <BirthdayModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }

  handleSubmit() {
    getData('user').then((data) => {
      const profileData = {
        name: this.state.name,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth,
        avatar: this.state.avatar
      };

      createProfile(profileData, data.jwt).then(() => {
        const mergedData = Object.assign(data, profileData);
        setData('user', mergedData);
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.thumbnailContainer}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => navigate('Camera', {
                handlePhoto: path => this.setState({ avatar: path })
              })}
            >
              <Image
                resizeMode={this.state.avatar !== '' ? 'cover' : 'contain'}
                style={styles.image}
                source={this.state.avatar !== '' ? { uri: this.state.avatar } : profile}
              />
              {this.handleSubmit()}
            </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text>Name</Text>
              </View>
              <View style={styles.itemText2}>
                <Text>{this.state.name}</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text>Geschlecht</Text>
              </View>
              <View style={styles.itemText2}>
                <Text>{this.state.gender === 'male' ? 'männlich' : 'weiblich'}</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text>Geburtstag</Text>
              </View>
              <View style={styles.itemText2}>
                <Text>{this.state.dateOfBirth}</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text style={{ fontWeight: 'bold' }}>Kontodaten</Text>
              </View>
              <View style={styles.itemText2}>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text>E-Mail</Text>
              </View>
              <View style={styles.itemText2}>
                <Text>{this.state.email}</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.itemText1}>
                <Text>Notifications</Text>
              </View>
              <View style={styles.itemText2}>
                <Switch
                  style={{ height: 23, marginBottom: -8 }}
                  onValueChange={this.handleNotificationSwitchChange}
                  value={this.state.notificationsEnabled}
                  onTintColor={COLOR.PRIMARY}
                  thumbTintColor={this.state.notificationsEnabled ? COLOR.SECONDARY : '#FFFFFF'}
                />
              </View>
            </View>
            <View style={[styles.itemContainer, { paddingBottom: 20 }]}>
              <Button
                title="Abmelden"
                color={COLOR.SECONDARY}
                onPress={() => {
                  removeData('user');
                  removeData('notifications');
                  removeData('charts');
                  const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Register' })
                    ]
                  });
                  this.props.navigation.dispatch(resetAction);
                }}
              />
            </View>
          </View>
          {this.renderNameModal()}
          {this.renderGenderModal()}
          {this.renderBirthdayModal()}
        </ScrollView>
        <Button
          style={{ position: 'absolute', bottom: 0 }}
          title="Notification testen"
          color={COLOR.SECONDARY}
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
