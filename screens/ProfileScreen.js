import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';
import { Thumbnail } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData, removeData } from '../services/storageService';
import { enableNotifications } from '../services/notificationService';
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8
  },
  itemText1: {
    width: 150,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  itemText2: {
    width: 150,
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
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    headerTitle: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      text: '',
      email: '',
      modalVisible: false,
      activeModal: '',
      notificationsEnabled: true
    };
    this.handleNotificationSwitchChange = this.handleNotificationSwitchChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  componentWillMount() {
    getData('user').then((data) => {
      this.setState({
        name: data.name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        email: data.email
      });
    });

    getData('notifications').then((enabled) => {
      this.setState({ notificationsEnabled: enabled });
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


  render() {
    const { goBack } = this.props.navigation;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.thumbnailContainer}>
          <Thumbnail
            size={100}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100
            }}
            source={profile}
          />
        </View>

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
          <TouchableOpacity
            onPress={() => this.setState({
              modalVisible: true
            })}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Text
              style={{
                paddingTop: 5
              }}
            >
              weiteres Kind
            </Text>
            <Icon
              style={{
                color: COLOR.PRIMARY,
                marginLeft: 15
              }}
              name="plus-circle"
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText1}>
            <Text>Kontodaten</Text>
          </View>
          <View style={styles.itemText2}>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText1}>
            <Text>E-Mail Adresse</Text>
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
              onValueChange={this.handleNotificationSwitchChange}
              value={this.state.notificationsEnabled}
              onTintColor={COLOR.PRIMARY}
              thumbTintColor={COLOR.SECONDARY}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Button
            title="Abmelden"
            color={COLOR.SECONDARY}
            onPress={() => {
              removeData('user');
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

        {this.renderNameModal()}
        {this.renderGenderModal()}
        {this.renderBirthdayModal()}
      </ScrollView>
    );
  }
}
